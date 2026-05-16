import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManagerComponent } from '../manager/manager.component';

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
  teamRequestsHandled: number;
  approvedRequests: number;
  pendingReviews: number;
  escalatedRequests: number;
  teamBudgetOverview: number;
}

interface ActivityItem {
  id: string;
  type: 'request' | 'approval' | 'escalation' | 'review';
  description: string;
  timestamp: string;
  icon: string;
}

@Component({
  selector: 'app-manager-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ManagerComponent],
  templateUrl: './manager-profile.component.html',
  styleUrls: ['./manager-profile.component.scss']
})
export class ManagerProfileComponent implements OnInit {
  userProfile: UserProfile = {
    id: 'MGR001',
    fullName: 'Jane Smith',
    email: 'jane.smith@company.com',
    phone: '+1 (555) 987-6543',
    role: 'Manager',
    department: 'Engineering',
    employeeId: 'MGR001',
    reportingManager: 'CEO',
    officeLocation: 'New York, NY',
    avatar: 'https://i.pravatar.cc/150?img=2',
    lastLogin: '2024-01-15 08:45 AM',
    isOnline: true,
    verificationStatus: 'verified'
  };

  quickStats: QuickStats = {
    teamRequestsHandled: 45,
    approvedRequests: 38,
    pendingReviews: 7,
    escalatedRequests: 3,
    teamBudgetOverview: 25000
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
      description: 'Approved team member travel request',
      timestamp: '2024-01-15 09:15 AM',
      icon: 'check_circle'
    },
    {
      id: '2',
      type: 'escalation',
      description: 'Escalated high-priority request to finance',
      timestamp: '2024-01-14 02:30 PM',
      icon: 'arrow_upward'
    },
    {
      id: '3',
      type: 'review',
      description: 'Completed quarterly budget review',
      timestamp: '2024-01-13 11:00 AM',
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
      financeUpdates: [true],
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