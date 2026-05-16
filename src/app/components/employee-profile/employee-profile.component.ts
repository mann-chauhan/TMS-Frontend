import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeComponent } from '../employee/employee.component';

interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'Employee' | 'Manager' | 'Finance';
  department: string;
  employeeId: string;
  reportingManager: string;
  officeLocation: string;
  avatar: string;
  lastLogin: string;
  isOnline: boolean;
  verificationStatus: 'verified' | 'pending' | 'unverified';
}

interface QuickStats {
  totalRequests: number;
  approvedTrips: number;
  pendingApprovals: number;
  totalReimbursements: number;
  totalSpend: number;
}

interface ActivityItem {
  id: string;
  type: 'request' | 'approval' | 'reimbursement' | 'accountability';
  description: string;
  timestamp: string;
  icon: string;
}

@Component({
  selector: 'app-employee-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EmployeeComponent],
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {
  userProfile: UserProfile = {
    id: 'EMP001',
    fullName: 'John Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    role: 'Employee',
    department: 'Engineering',
    employeeId: 'EMP001',
    reportingManager: 'Jane Smith',
    officeLocation: 'New York, NY',
    avatar: 'https://i.pravatar.cc/150?img=1',
    lastLogin: '2024-01-15 09:30 AM',
    isOnline: true,
    verificationStatus: 'verified'
  };

  quickStats: QuickStats = {
    totalRequests: 12,
    approvedTrips: 8,
    pendingApprovals: 2,
    totalReimbursements: 5,
    totalSpend: 4500
  };

  personalInfoForm: FormGroup;
  securityForm: FormGroup;
  preferencesForm: FormGroup;
  notificationsForm: FormGroup;

  activeTab: 'overview' | 'personal' | 'security' | 'preferences' | 'notifications' | 'activity' | 'documents' = 'overview';

  activityTimeline: ActivityItem[] = [
    {
      id: '1',
      type: 'request',
      description: 'Travel request submitted for Q1 Conference',
      timestamp: '2024-01-15 10:00 AM',
      icon: 'flight'
    },
    {
      id: '2',
      type: 'approval',
      description: 'Request approved by manager',
      timestamp: '2024-01-15 11:30 AM',
      icon: 'check_circle'
    },
    {
      id: '3',
      type: 'reimbursement',
      description: 'Reimbursement processed for $250',
      timestamp: '2024-01-14 03:00 PM',
      icon: 'payment'
    }
  ];

  constructor(private fb: FormBuilder) {
    this.personalInfoForm = this.fb.group({
      fullName: [this.userProfile.fullName, Validators.required],
      phone: [this.userProfile.phone, [Validators.required, Validators.pattern(/^[\+]?[1-9][\d]{0,15}$/)]],
      emergencyContact: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['USA', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]]
    });

    this.securityForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });

    this.preferencesForm = this.fb.group({
      preferredTransport: ['flight'],
      preferredClass: ['economy'],
      mealPreference: ['standard'],
      hotelPreference: ['business'],
      preferredDepartureCity: [''],
      seatPreference: ['window']
    });

    this.notificationsForm = this.fb.group({
      emailNotifications: [true],
      approvalUpdates: [true],
      financeUpdates: [false],
      travelReminders: [true],
      smsAlerts: [false]
    });
  }

  ngOnInit(): void {}

  switchTab(tab: 'overview' | 'personal' | 'security' | 'preferences' | 'notifications' | 'activity' | 'documents'): void {
    this.activeTab = tab;
  }

  onPhotoUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Handle photo upload
    }
  }

  onSavePersonalInfo(): void {
    if (this.personalInfoForm.valid) {
      // Save logic here
    }
  }

  onSaveSecurity(): void {
    if (this.securityForm.valid) {
      // Password change logic
    }
  }

  onSavePreferences(): void {
    // Save preferences logic
  }

  onSaveNotifications(): void {
    // Save notifications logic
  }

  private passwordMatchValidator(group: FormGroup): any {
    const newPassword = group.get('newPassword');
    const confirmPassword = group.get('confirmPassword');
    return newPassword && confirmPassword && newPassword.value === confirmPassword.value
      ? null : { passwordMismatch: true };
  }

  getRoleColor(): string {
    switch (this.userProfile.role) {
      case 'Employee': return '#10b981';
      case 'Manager': return '#3b82f6';
      case 'Finance': return '#f59e0b';
      default: return '#6b7280';
    }
  }
}