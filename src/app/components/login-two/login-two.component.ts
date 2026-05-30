import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService }
from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-two.component.html',
  styleUrls: ['./login-two.component.scss']
})
export class LoginComponentTwo
  implements OnInit, OnDestroy {

  private readonly timeoutIds: number[] = [];

  // =====================================
  // FORM STATE
  // =====================================

  loginForm!: FormGroup;

  isLoading = false;

  showPassword = false;

  showError = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    this.initializeForm();
  }

  ngOnDestroy(): void {

    this.timeoutIds.forEach(
      timeoutId =>
        window.clearTimeout(timeoutId)
    );
  }

  // =====================================
  // INITIALIZE FORM
  // =====================================

  private initializeForm(): void {

    this.loginForm = this.fb.group({

      email: [

        '',

        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [

        '',

        [
          Validators.required,
          Validators.minLength(6)
        ]
      ]
    });
  }

  // =====================================
  // FIELD VALIDATION
  // =====================================

  isFieldInvalid(
    fieldName: string
  ): boolean {

    const field =
      this.loginForm.get(fieldName);

    return !!(

      field &&

      field.invalid &&

      (
        field.dirty ||
        field.touched
      )
    );
  }

  // =====================================
  // LOGIN
  // =====================================

  onSubmit(): void {

    if (!this.loginForm.valid) {

      this.markFormGroupTouched(
        this.loginForm
      );

      return;
    }

    this.isLoading = true;

    this.showError = false;

    this.authService

      .login(
        this.loginForm.value
      )

      .subscribe({

        next: (response: any) => {

          console.log(
            'LOGIN SUCCESS',
            response
          );

          this.authService.saveUser(

            response.token,

            response.role,

            response.name
          );

          this.isLoading = false;

          this.redirectByRole(
            response.role
          );
        },

        error: (error: any) => {

          console.log(error);

          this.isLoading = false;

          this.showError = true;

          this.loginForm.patchValue({

            password: ''
          });

          this.setManagedTimeout(() => {

            this.showError = false;

          }, 4000);
        }
      });
  }

  // =====================================
  // ROLE REDIRECT
  // =====================================

  private redirectByRole(
    role: string
  ): void {

    switch (role) {

      case 'EMPLOYEE':

        this.router.navigate([
          '/employee'
        ]);

        break;

      case 'MANAGER':

        this.router.navigate([
          '/manager'
        ]);

        break;

      case 'FINANCE':

        this.router.navigate([
          '/finance'
        ]);

        break;

      case 'ADMIN':

        this.router.navigate([
          '/admin'
        ]);

        break;

      default:

        this.router.navigate([
          '/login'
        ]);
    }
  }

  // =====================================
  // TIMEOUT HELPER
  // =====================================

  private setManagedTimeout(
    callback: () => void,
    delay: number
  ): void {

    const timeoutId =
      window.setTimeout(() => {

        this.timeoutIds.splice(

          this.timeoutIds.indexOf(
            timeoutId
          ),

          1
        );

        callback();

      }, delay);

    this.timeoutIds.push(
      timeoutId
    );
  }

  // =====================================
  // TOUCH FORM
  // =====================================

  private markFormGroupTouched(
    formGroup: FormGroup
  ): void {

    Object.keys(
      formGroup.controls
    ).forEach(key => {

      const control =
        formGroup.get(key);

      control?.markAsTouched();

      if (
        control instanceof FormGroup
      ) {

        this.markFormGroupTouched(
          control
        );
      }
    });
  }

  // =====================================
  // SSO
  // =====================================

  handleSSO(): void {

    alert(
      'SSO functionality will be implemented here.'
    );
  }

  // =====================================
  // SUPPORT
  // =====================================

  contactSupport(): void {

    alert(
      'Support:\n\nEmail: support@travelconcierge.com'
    );
  }
}