import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoopBackConfig} from '../../shared/sdk/lb.config';

@Component({
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup;
  model: any = {};

  alertType: string;
  message: string;
  messageType: string;

  accessToken: string;

  errorMessages = {
    'password': {
      'required': 'Password is required'
    },
    'passwordConfirm': {
      'required': 'Password confirmation is required'
    },
    'passwordMatches': 'Password fields must match'
  };

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.createForm();

    this.accessToken = this.route.snapshot.queryParams['token'];

    if (!this.accessToken) {
      this.alertType = 'invalid_token';
      this.resetForm.disable();
    }
  }

  createForm() {

    this.resetForm = this.fb.group(
      {
        password: ['', [Validators.required]],
        passwordConfirm: ['', [Validators.required]]
      }, {
        validator: this.checkPasswordsMatch
      });

    this.resetForm.valueChanges
      .subscribe(data => this.model = data);
  }

  private checkPasswordsMatch(control: AbstractControl): ValidationErrors {

    const password = control.get('password');
    const passwordConfirm = control.get('passwordConfirm');

    if (password.value !== passwordConfirm.value) {
      return { passwordMatches: true };
    }

    return {};
  }

  onSubmit() {

    if (this.isValid()) {

      const url = LoopBackConfig.getPath() + '/api/relyfer-users/reset-password?access_token=' + this.accessToken;

      this.http.post(
        url,
        'newPassword=' + this.model.password,
        {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')}
      ).subscribe(
        success => {
          this.alertType = 'success';
        },
        error => {

          if (error.status === 401) {
            this.alertType = 'unauthorized';
          } else {
            this.alertType = 'unexpected';
          }

        }
      );

    }

  }

  isValid() {

    // reset error message
    this.alertType = null;
    this.messageType = 'danger';
    this.message = null;

    const form = this.resetForm;

    // form level errors
    if (form.invalid && form.errors) {
      this.alertType = 'error';
      this.message = this.errorMessages[Object.keys(form.errors)[0]];
      return false;
    }

    // field level errors
    for (const key in form.controls) {
      const control = form.controls[key];

      if (control && control.invalid) {
        this.alertType = 'error';
        this.message = this.errorMessages[key][Object.keys(control.errors)[0]];
        break;
      }
    }

    return !this.message;
  }

}
