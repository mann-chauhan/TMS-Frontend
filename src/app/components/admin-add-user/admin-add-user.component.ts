import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminComponent } from '../admin/admin.component';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

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
  managerName: string = '';
  userId!: number;

isEditMode = false;
  
  adminAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvZbudJVibXUOwMasG0qZAP9mS8sU1zYMZfpU5cCyOe9IxsCKoE-qq2dXI0VP-F4OJ_0tQ6grng2jkUg1fnEVvpOQjsBYTvpLuOKCExVdoJNuPtXEsLtlItBt5EaoElYR3lbdqt4O60f8rO0kqXKwV5HS2yIG_0WFKVWKXYuaavCIr4uNAHog_-GKNSjSYW38RkM5OVsgHDQGJM1AvxBiwvXbfxNx2fFHAKOUokroHSiamRmU5AFbzTjCHLknA7dULlVuv-JJTHHvC';

  departments = ['Java', '.Net', 'AI_GENAI', 'DE', 'QA'];
  // roles = ['Employee', 'Manager', 'Finance', 'Admin'];

  roles = [
  { id: 1, name: 'ADMIN' },
  { id: 2, name: 'EMPLOYEE' },
  { id: 3, name: 'MANAGER' },
  { id: 4, name: 'FINANCE' }
];



  constructor(private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.userForm = this.fb.group({
      employeeCode: ['', Validators.required],
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phone: ['', [Validators.required, Validators.pattern(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/)]],
      department: ['', Validators.required],
      role: ['', Validators.required],
      isActive: [true]
    });
    this.route.params.subscribe(params => {
     if(params['id']){
    this.userId = params['id'];
    this.isEditMode = true;
    this.getUserById(this.userId);
      }
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

onSubmit() {

  if (this.userForm.invalid) {
    return;
  }

  const payload = {
    employeeCode: this.userForm.value.employeeCode,
    fullName: this.userForm.value.fullName,
    email: this.userForm.value.email,
    password: this.userForm.value.password,
    phone: this.userForm.value.phone,
    department: this.userForm.value.department,
    roleId: this.userForm.value.role,
    isActive: this.userForm.value.isActive,
    profileImage: 'profile.png'
  };

  console.log(payload);

  this.userService.addUser(payload)
    .subscribe({

      next: (response) => {

        console.log(response);

        alert("User Added Successfully");

        this.userForm.reset();
      },

      error: (error) => {

        console.log(error);

        alert("Something went wrong");
      }
    });
}

onUpdate() {

  if (this.userForm.invalid) {
    return;
  }

  const payload = {

    fullName: this.userForm.value.fullName,

    email: this.userForm.value.email,

    password: this.userForm.value.password,

    phone: this.userForm.value.phone,

    department: this.userForm.value.department,

    roleId: this.userForm.value.role,

    isActive: this.userForm.value.isActive,

    profileImage: 'profile.png'
  };

  console.log(payload);

  this.userService
    .updateUser(this.userId, payload)
    .subscribe({

      next: (response) => {

        console.log(response);

        alert('User Updated Successfully');
      },

      error: (error) => {

        console.log(error);

        alert('Update Failed');
      }
    });
  }

  onReset(): void {
    this.userForm.reset({
      isActive: true
    });
    this.profileImagePreview = null;
    this.showPassword = false;
  }

  onDepartmentChange() {

  const department = this.userForm.value.department;

  if (!department) {

    this.managerName = '';

    return;
  }

  

  this.userService
    .getManagerByDepartment(department)
    .subscribe({

      next: (response: any) => {

        console.log(response);

        this.managerName = response.fullName;
      },

      error: () => {

        this.managerName = 'No Manager Assigned';
      }
    });
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

  getUserById(id: number){

  this.userService.getUserById(id)
    .subscribe({

      next: (response: any) => {

        console.log(response);

        this.userForm.patchValue({

          fullName: response.fullName,
          email: response.email,
          password: '',
          phone: response.phone,
          department: response.department,
          isActive: response.isActive
        });

        // role mapping

        const selectedRole = this.roles.find(
          role => role.name === response.role
        );

        if(selectedRole){

          this.userForm.patchValue({
            role: selectedRole.id
          });
        }

        this.managerName = response.fullName;
      },

      error: (error) => {

        console.log(error);
      }
    });
}
}
