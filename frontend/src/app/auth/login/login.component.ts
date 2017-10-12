import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RoboUserApi } from "../../shared/sdk/services/custom/RoboUser";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  returnUrl;

  loginForm: FormGroup;
  credentials = {};

  errorMessage;

  errorMessages = {
    email: {
      required: "Email is required",
      email: "Must be a valid email address"
    },
    password: {
      required: "Password is required"
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userApi: RoboUserApi
  ) {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });

    this.loginForm.valueChanges.subscribe(data => (this.credentials = data));
  }

  onSubmit() {
    if (this.isValid()) {
      this.userApi.login(this.credentials, ["user", "roles"]).subscribe(
        resp => {
          // login successful so redirect to return url
          this.router.navigateByUrl(this.returnUrl);
        },
        error => {
          if (error.statusCode === 401) {
            this.errorMessage = "Email or password is incorrect";
          }
        }
      );
    }
  }

  isValid() {
    // reset error message
    this.errorMessage = null;

    const form = this.loginForm;

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
