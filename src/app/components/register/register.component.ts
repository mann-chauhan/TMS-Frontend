import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  return password === confirmPassword
    ? null
    : { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls:['./register.component.scss']
})
export class RegisterComponent {

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    employeeId: new FormControl('', [Validators.required]),
    managerId: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
    city: new FormControl(''),
    state: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  },{ validators: passwordMatchValidator })
  
  onSubmit() {
    if (this.registerForm.valid) { // check form valid
      console.log(this.registerForm.value);
    } else {
      this.registerForm.markAllAsTouched(); // show errors
    }
  }
}
