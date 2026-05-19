/**
 * ANSWERED REQUESTS COMPONENT - Angular 18
 * Display approved and rejected travel requests
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ManagerComponent } from '../manager/manager.component';

interface TravelRequest {
  id: string;
  employeeName: string;
  employeeImage?: string;
  destination: string;
  dates: string;
  budget: number;
  status: 'pending' | 'approved' | 'rejected';
  approvedAt?: Date;
  approvedBy?: string;
  notes?: string;
}

interface NavItem {
  label: string;
  icon: string;
  route: string;
  active: boolean;
}

@Component({
  selector: 'app-answered-requests',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ManagerComponent],
  templateUrl: './answered-requests.component.html',
  styleUrls: ['./answered-requests.component.scss']
})
export class AnsweredRequestsComponent implements OnInit {
  private readonly ANSWERED_REQUESTS_KEY = 'answeredRequests';

  /* ============ NAVIGATION ============ */
  navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard', active: false },
    { label: 'View Requests', icon: 'list_alt', route: '/requests', active: false },
    { label: 'Answered', icon: 'check_circle', route: '/answered', active: true },
    { label: 'Settings', icon: 'settings', route: '/settings', active: false }
  ];

  /* ============ USER INFO ============ */
  profileImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcF2cK-8D23AMj2Qi54mwPJhpBx6qZKIbVjJ2brJdvWlHeUO1hUKgUVFlb8gEZEv1vnrXFM4ePdly6cetz1yVsOlT4f42fDPZ8T8czoDuMN-74iuIQPHWZgy7VQJ5QYieeo5ExDuZCHAT-4E1WrRl1lnzmAk4vbAhj4Q_WeqB4eTxpmzPm-IWdmz82lv0By4PJfXdu7O-Ij7KqmhEqhrarF0YoDYVNspLHNx5nodipdgVNdvV30jS0ESbrgeRCGixjIkvZfjgFWRnW';

  /* ============ DATA ============ */
  answeredRequests: TravelRequest[] = [];
  filteredRequests: TravelRequest[] = [];
  searchTerm = '';
  approvedCount = 0;
  rejectedCount = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadAnsweredRequests();
  }

  /**
   * Load answered requests from localStorage
   */
  private loadAnsweredRequests(): void {
    const stored = localStorage.getItem(this.ANSWERED_REQUESTS_KEY);
    if (stored) {
      try {
        this.answeredRequests = JSON.parse(stored);
        this.filteredRequests = [...this.answeredRequests];
        this.updateCounts();
      } catch (e) {
        console.error('Error loading answered requests:', e);
      }
    }
  }

  /**
   * Update approve and reject counts
   */
  private updateCounts(): void {
    this.approvedCount = this.answeredRequests.filter(r => r.status === 'approved').length;
    this.rejectedCount = this.answeredRequests.filter(r => r.status === 'rejected').length;
  }

  /**
   * Handle search
   */
  onSearch(): void {
    const searchLower = this.searchTerm.toLowerCase();
    this.filteredRequests = this.answeredRequests.filter(request =>
      request.id.toLowerCase().includes(searchLower) ||
      request.employeeName.toLowerCase().includes(searchLower) ||
      request.destination.toLowerCase().includes(searchLower)
    );
  }

  /**
   * Get initials from name
   */
  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  }

  /**
   * Format status
   */
  formatStatus(status: string): string {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  /**
   * View request details
   */
  viewDetails(request: TravelRequest): void {
    console.log('Viewing details:', request);
  }

  /**
   * Delete single request
   */
  deleteRequest(requestId: string): void {
    const confirmed = confirm('Are you sure you want to delete this request?');
    if (!confirmed) return;

    this.answeredRequests = this.answeredRequests.filter(r => r.id !== requestId);
    localStorage.setItem(this.ANSWERED_REQUESTS_KEY, JSON.stringify(this.answeredRequests));

    this.filteredRequests = this.filteredRequests.filter(r => r.id !== requestId);
    this.updateCounts();
  }

  /**
   * Clear all answered requests
   */
  clearAll(): void {
    const confirmed = confirm('Are you sure you want to clear all answered requests? This cannot be undone.');
    if (!confirmed) return;

    this.answeredRequests = [];
    this.filteredRequests = [];
    localStorage.setItem(this.ANSWERED_REQUESTS_KEY, JSON.stringify([]));
    this.updateCounts();
  }

  /**
   * Export to CSV
   */
  exportCSV(): void {
    const headers = ['Request ID', 'Employee Name', 'Destination', 'Dates', 'Budget', 'Status', 'Answered Date'];
    const rows = this.answeredRequests.map(req => [
      req.id,
      req.employeeName,
      req.destination,
      req.dates,
      `$${req.budget}`,
      req.status,
      req.approvedAt ? new Date(req.approvedAt).toLocaleDateString() : 'N/A'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `answered-requests-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Logout
   */
  logout(): void {
    const confirmed = confirm('Are you sure you want to logout?');
    if (confirmed) {
      this.router.navigate(['/login']);
    }
  }

  /**
   * Track by function for performance
   */
  trackByNavLabel(index: number, item: NavItem): string {
    return item.label;
  }
}
