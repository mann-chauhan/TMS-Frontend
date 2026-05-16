import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FinanceComponent } from '../finance/finance.component';

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
  requestsReviewed: number;
  approvedBudgets: number;
  pendingApprovals: number;
  totalBudgetManaged: number;
  complianceChecks: number;
}

interface ActivityItem {
  id: string;
  type: 'review' | 'approval' | 'rejection' | 'audit';
  description: string;
  timestamp: string;
  icon: string;
}

@Component({
  selector: 'app-finance-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FinanceComponent],
  templateUrl: './finance-profile.component.html',
  styleUrls: ['./finance-profile.component.scss']
})
export class FinanceProfileComponent implements OnInit {
  userProfile: UserProfile = {
    id: 'FIN001',
    fullName: 'Robert Johnson',
    email: 'robert.johnson@company.com',
    phone: '+1 (555) 321-9876',
    role: 'Finance',
    department: 'Finance',
    employeeId: 'FIN001',
    reportingManager: 'CFO',
    officeLocation: 'Chicago, IL',
    avatar: 'https://i.pravatar.cc/150?img=3',
    lastLogin: '2024-01-15 09:30 AM',
    isOnline: false,
    verificationStatus: 'verified'
  };

  quickStats: QuickStats = {
    requestsReviewed: 67,
    approvedBudgets: 52,
    pendingApprovals: 15,
    totalBudgetManaged: 500000,
    complianceChecks: 89
  };

  personalInfoForm: FormGroup;
  securityForm: FormGroup;
  preferencesForm: FormGroup;
  notificationsForm: FormGroup;

  activeTab: 'overview' | 'personal' | 'security' | 'preferences' | 'notifications' | 'activity' | 'documents' = 'overview';

  activityTimeline: ActivityItem[] = [
    {
      id: '1',
      type: 'approval',
      description: 'Approved budget request for Q1 marketing campaign',
      timestamp: '2024-01-15 10:45 AM',
      icon: 'check_circle'
    },
    {
      id: '2',
      type: 'audit',
      description: 'Completed compliance audit for travel expenses',
      timestamp: '2024-01-14 03:15 PM',
      icon: 'verified'
    },
    {
      id: '3',
      type: 'review',
      description: 'Reviewed and approved international travel request',
      timestamp: '2024-01-13 01:30 PM',
      icon: 'assessment'
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
      preferredClass: ['business'],
      mealPreference: ['standard'],
      hotelPreference: ['business'],
      preferredDepartureCity: [''],
      seatPreference: ['window']
    });

    this.notificationsForm = this.fb.group({
      emailNotifications: [true],
      approvalUpdates: [true],
      budgetAlerts: [true],
      complianceUpdates: [true],
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
      // Save personal info logic
    }
  }

  onSaveSecurity(): void {
    if (this.securityForm.valid) {
      // Change password logic
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