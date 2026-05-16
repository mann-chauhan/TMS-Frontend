import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

type Role = 'user' | 'manager' | 'finance';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  selectedRole: Role = 'user';
  showPassword = false;
  loginError = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  // Credentials per role
  credentials: Record<Role, { email: string; password: string; route: string }> = {
    user: {
      email: 'user@example.com',
      password: 'user123',
      route: '/employee'
    },
    manager: {
      email: 'manager@example.com',
      password: 'manager123',
      route: '/manager'
    },
    finance: {
      email: 'finance@example.com',
      password: 'finance123',
      route: '/finance'
    }
  };

  constructor(private router: Router) {}

  selectRole(role: Role): void {
    this.selectedRole = role;
    this.loginError = false;
    this.loginForm.reset();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const creds = this.credentials[this.selectedRole];

      if (email === creds.email && password === creds.password) {
        this.loginError = false;
        this.router.navigate([creds.route]);
      } else {
        this.loginError = true;
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}