import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RoboUserApi } from "../../shared/sdk/services/custom/RoboUser";
import { ToastrService } from "ngx-toastr";

@Component({
  templateUrl: "./signup.component.html"
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  data = {};

  errorMessage;

  errorMessages = {
    email: {
      required: "Email is required",
      email: "Must be a valid email address"
    },
    firstName: {
      required: "First name is required"
    },
    familyName: {
      required: "Family name is required"
    },
    password: {
      required: "Password is required",
      minlength: "Password must be at least 8 characters"
    },
    passwordConfirm: {
      required: "Password confirmation is required"
    },
    passwordMatches: "Password fields must match"
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private api: RoboUserApi,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.signupForm = this.fb.group(
      {
        firstName: ["", Validators.required],
        familyName: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        password: ["", Validators.required, Validators.minLength(8)],
        passwordConfirm: ["", [Validators.required]]
      },
      {
        validator: this.checkPasswordsMatch
      }
    );

    this.signupForm.valueChanges.subscribe(data => (this.data = data));
  }

  onSubmit() {
    if (this.isValid()) {
      this.api.create(this.data).subscribe(
        resp => {
          // user created successfully
          this.toastrService.success("Signup successful. Please login");
          this.router.navigate(["./login"]);
        },
        error => {
          // TODO add error handling
          console.log("Error:", error);
        }
      );
    }
  }

  checkPasswordsMatch(control: AbstractControl): ValidationErrors {
    const password = control.get("password");
    const passwordConfirm = control.get("passwordConfirm");

    if (password.value !== passwordConfirm.value) {
      return { passwordMatches: true };
    }

    return {};
  }

  isValid() {
    // reset error message
    this.errorMessage = null;

    const form = this.signupForm;

    for (const key in form.controls) {
      const control = form.controls[key];

      if (control && control.invalid) {
        for (const errorKey in control.errors) {
          this.errorMessage = this.errorMessages[key][errorKey];
          break;
        }
      }

      if (this.errorMessage) break;
    }

    return !this.errorMessage;
  }
}
