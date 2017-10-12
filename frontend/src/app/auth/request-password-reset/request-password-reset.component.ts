import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RoboUserApi } from "../../shared/sdk/services/custom/RoboUser";

@Component({
  templateUrl: "./request-password-reset.component.html",
  styleUrls: ["./request-password-reset.component.css"]
})
export class RequestPasswordResetComponent implements OnInit {
  resetForm: FormGroup;
  credentials = {};

  message: string;
  messageType: string;

  errorMessages = {
    email: {
      required: "Email is required",
      email: "Must be a valid email address"
    }
  };

  constructor(private fb: FormBuilder, private userApi: RoboUserApi) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.resetForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]]
    });

    this.resetForm.valueChanges.subscribe(data => (this.credentials = data));
  }

  onSubmit() {
    this.message = null;

    if (this.isValid()) {
      this.userApi.resetPassword(this.credentials).subscribe(
        resp => {
          this.message = "Please check your email inbox";
          this.messageType = "success";
        },
        error => {
          this.messageType = "danger";

          if (error.statusCode === 404) {
            this.message = "A user with that email was not found";
          } else {
            this.message = "An unexpected error has occurred";
          }
        }
      );
    }
  }

  isValid() {
    // reset error message
    this.messageType = "danger";
    this.message = null;

    const form = this.resetForm;

    for (const key in form.controls) {
      const control = form.controls[key];

      if (control && control.invalid) {
        for (const errorKey in control.errors) {
          this.message = this.errorMessages[key][errorKey];
          break;
        }
      }

      if (this.message) break;
    }

    return !this.message;
  }
}
