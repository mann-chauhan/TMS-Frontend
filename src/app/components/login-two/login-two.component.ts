/**
 * SIGN IN COMPONENT - Angular 18
 * 
 * Features:
 * - Reactive form with validation
 * - Password visibility toggle
 * - Error handling
 * - Loading states
 * - Mock authentication
 */

// Email	                     Password
// user@travelconcierge.com	   Password@123
// employee@tms.com        	   Employee@123
// admin@travelconcierge.com   Admin@123

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

type UserRole = 'employee' | 'manager' | 'finance' | 'admin';

interface LoginUser {
  email: string;
  password: string;
  route: string;
}

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-two.component.html',
  styleUrls: ['./login-two.component.scss']
})
export class LoginComponentTwo implements OnInit, OnDestroy {
  private readonly timeoutIds: number[] = [];

  /* ============ FORM STATE ============ */
  loginForm!: FormGroup;
  isLoading: boolean = false;
  showPassword: boolean = false;
  showError: boolean = false;

  /* ============ MOCK CREDENTIALS ============ */
  private credentials: Record<UserRole, LoginUser> = {
    employee: {
      email: 'employee@gmail.com',
      password: 'Employee@123',
      route: '/employee'
    },
    manager: {
      email: 'manager@gmail.com',
      password: 'Manager@123',
      route: '/manager'
    },
    finance: {
      email: 'finance@gmail.com',
      password: 'Finance@123',
      route: '/finance'
    },
    admin: {
      email: 'admin@travelconcierge.com',
      password: 'Admin@123',
      route: '/admin'
    }
  };

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {
    this.timeoutIds.forEach(timeoutId => window.clearTimeout(timeoutId));
  }

  /**
   * Initialize reactive form with validation
   */
  private initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });
  }

  /**
   * Check if field is invalid and touched
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    if (!this.loginForm.valid) {
      this.markFormGroupTouched(this.loginForm);
      return;
    }

    this.isLoading = true;
    this.showError = false;

    // Simulate API call
    this.setManagedTimeout(() => {
      this.authenticateUser();
    }, 800);
  }

  private authenticateUser(): void {
    const { email, password } = this.loginForm.value;
    const roles = Object.keys(this.credentials) as UserRole[];
    const matchedRole = roles.find(role => {
      const creds = this.credentials[role];
      return creds.email === email && creds.password === password;
    });

    if (matchedRole) {
      this.handleSuccessfulLogin(this.credentials[matchedRole], matchedRole);
    } else {
      this.handleFailedLogin();
    }
  }

  /**
   * Handle successful login
   */
  private handleSuccessfulLogin(user: LoginUser, role: UserRole): void {
    this.isLoading = false;
  
    console.log('✅ Login success:', role);
  
    // store session
    sessionStorage.setItem('user_role', role);
    sessionStorage.setItem('authenticated', 'true');
  
    // 🔥 ROUTE FROM OLD LOGIN LOGIC
    this.setManagedTimeout(() => {
      this.router.navigate([user.route]);
    }, 300);
  }

  /**
   * Handle failed login
   */
  private handleFailedLogin(): void {
    this.isLoading = false;
    this.showError = true;

    // Reset password
    this.loginForm.patchValue({ password: '' });

    // Auto-hide error
    this.setManagedTimeout(() => {
      this.showError = false;
    }, 4000);
  }

  private setManagedTimeout(callback: () => void, delay: number): void {
    const timeoutId = window.setTimeout(() => {
      this.timeoutIds.splice(this.timeoutIds.indexOf(timeoutId), 1);
      callback();
    }, delay);

    this.timeoutIds.push(timeoutId);
  }

  /**
   * Mark all fields as touched
   */
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  /**
   * Handle SSO login
   */
  handleSSO(): void {
    console.log('Opening SSO login');
    alert('SSO (Single Sign-On) functionality would be implemented here.\n\nSupported providers:\n- Google\n- Microsoft\n- SAML');
  }

  /**
   * Contact support
   */
  contactSupport(): void {
    console.log('Opening support');
    alert('Support Information:\n\nEmail: support@travelconcierge.com\nPhone: +1 (800) 123-4567\nLive Chat: 24/7 Available');
  }
}
