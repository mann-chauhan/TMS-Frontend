import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminComponent } from '../admin/admin.component';

interface UserFormData {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  department: string;
  role: string;
  isActive: boolean;
  profileImage?: File;
}

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, AdminComponent],
  templateUrl: './admin-add-user.component.html',
  styleUrls: ['./admin-add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userForm!: FormGroup;
  profileImagePreview: string | null = null;
  showPassword = false;
  isSubmitting = false;
  isUpdating = false;
  searchQuery = '';
  
  adminAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvZbudJVibXUOwMasG0qZAP9mS8sU1zYMZfpU5cCyOe9IxsCKoE-qq2dXI0VP-F4OJ_0tQ6grng2jkUg1fnEVvpOQjsBYTvpLuOKCExVdoJNuPtXEsLtlItBt5EaoElYR3lbdqt4O60f8rO0kqXKwV5HS2yIG_0WFKVWKXYuaavCIr4uNAHog_-GKNSjSYW38RkM5OVsgHDQGJM1AvxBiwvXbfxNx2fFHAKOUokroHSiamRmU5AFbzTjCHLknA7dULlVuv-JJTHHvC';

  departments = ['Operations', 'Finance', 'Human Resources', 'Logistics', 'Technology'];
  roles = ['Employee', 'Manager', 'Finance', 'Admin'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.userForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phone: ['', [Validators.required, Validators.pattern(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/)]],
      department: ['', Validators.required],
      role: ['', Validators.required],
      isActive: [true]
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      
      // Validate file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must not exceed 2MB');
        return;
      }

      // Validate file type
      if (!file.type.match(/image\/(jpeg|png)/)) {
        alert('Only JPG and PNG files are allowed');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.profileImagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.isSubmitting = true;
      
      const formData: UserFormData = this.userForm.value;
      
      console.log('Creating new user:', formData);
      
      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        alert('User created successfully!');
        this.onReset();
      }, 1500);
    } else {
      this.markFormGroupTouched(this.userForm);
    }
  }

  onUpdate(): void {
    if (this.userForm.valid) {
      this.isUpdating = true;
      
      const formData: UserFormData = this.userForm.value;
      
      console.log('Updating user:', formData);
      
      // Simulate API call
      setTimeout(() => {
        this.isUpdating = false;
        alert('User updated successfully!');
      }, 1500);
    } else {
      this.markFormGroupTouched(this.userForm);
    }
  }

  onReset(): void {
    this.userForm.reset({
      isActive: true
    });
    this.profileImagePreview = null;
    this.showPassword = false;
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
      
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
