import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SharedModules } from '../../shared/shared-modules/shared-modules';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login-page',
  imports: [...SharedModules],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  loginForm: FormGroup;
  hidePassword = true;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private authService: Auth,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const loginFormData = this.loginForm.value;

    try {
      const response: any = await this.authService.login(
        loginFormData.email,
        loginFormData.password
      );

      const token = response?.token || response?.data?.token;
      const user = response?.user || response?.data?.user;

      if (!token) {
        throw new Error('Login response does not contain token.');
      }

      this.authService.storeToken(token);
      this.authService.storeUser(user || { email: loginFormData.email });

      this.loginForm.reset();

      const returnUrl =
        this.route.snapshot.queryParamMap.get('returnUrl') || '/students';

      this.router.navigate([returnUrl]);
    } catch (error) {
      console.log('FAIL ==> ', error);
      this.errorMessage =
        'Login failed. Please check your email, password, and API server.';
    } finally {
      this.isSubmitting = false;
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}