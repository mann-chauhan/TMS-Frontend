/**
 * ANSWERED REQUESTS COMPONENT - Angular 18
 * Display approved and rejected travel requests
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { ManagerComponent } from '../manager/manager.component';

import { TravelRequestService }
from '../../services/travel-request.service';

// ================================================
// INTERFACE
// ================================================

interface TravelRequest {

  id: number;

  requestCode: string;

  employeeName: string;

  managerName: string;

  fromLocation: string;

  destination: string;

  purpose: string;

  startDate: string;

  endDate: string;

  estimatedBudget: number;

  transportMode: string;

  hotelRequired: boolean;

  hotelPreference: string;

  additionalNotes: string;

  status: string;
}

interface NavItem {

  label: string;

  icon: string;

  route: string;

  active: boolean;
}

// ================================================
// COMPONENT
// ================================================

@Component({
  selector: 'app-answered-requests',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ManagerComponent
  ],
  templateUrl: './answered-requests.component.html',
  styleUrls: ['./answered-requests.component.scss']
})

export class AnsweredRequestsComponent
implements OnInit {

  // ================================================
  // NAVIGATION
  // ================================================

  navItems: NavItem[] = [

    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard',
      active: false
    },

    {
      label: 'View Requests',
      icon: 'list_alt',
      route: '/requests',
      active: false
    },

    {
      label: 'Answered',
      icon: 'check_circle',
      route: '/answered',
      active: true
    },

    {
      label: 'Settings',
      icon: 'settings',
      route: '/settings',
      active: false
    }
  ];

  // ================================================
  // USER INFO
  // ================================================

  profileImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBcF2cK-8D23AMj2Qi54mwPJhpBx6qZKIbVjJ2brJdvWlHeUO1hUKgUVFlb8gEZEv1vnrXFM4ePdly6cetz1yVsOlT4f42fDPZ8T8czoDuMN-74iuIQPHWZgy7VQJ5QYieeo5ExDuZCHAT-4E1WrRl1lnzmAk4vbAhj4Q_WeqB4eTxpmzPm-IWdmz82lv0By4PJfXdu7O-Ij7KqmhEqhrarF0YoDYVNspLHNx5nodipdgVNdvV30jS0ESbrgeRCGixjIkvZfjgFWRnW';

  // ================================================
  // DATA
  // ================================================

  answeredRequests: TravelRequest[] = [];

  filteredRequests: TravelRequest[] = [];

  selectedRequest: TravelRequest | null = null;

  searchTerm = '';

  approvedCount = 0;

  rejectedCount = 0;

  constructor(

    private router: Router,

    private travelRequestService:
    TravelRequestService

  ) {}

  // ================================================
  // INIT
  // ================================================

  ngOnInit(): void {

    this.getAnsweredRequests();
  }

  // ================================================
  // GET ANSWERED REQUESTS
  // ================================================

  getAnsweredRequests(): void {

    this.travelRequestService
      .getManagerRequests(4)
      .subscribe({

        next: (response: any) => {

          console.log(response);

          this.answeredRequests =

            response.data.filter(

              (request: any) =>

                request.status === 'MANAGER_APPROVED'
                ||

                request.status === 'REJECTED'
            );

          this.filteredRequests =
            this.answeredRequests;

          this.updateCounts();
        },

        error: (error: any) => {

          console.log(error);
        }
      });
  }

  // ================================================
  // COUNTS
  // ================================================

  private updateCounts(): void {

    this.approvedCount =

      this.answeredRequests.filter(

        r => r.status === 'MANAGER_APPROVED'

      ).length;

    this.rejectedCount =

      this.answeredRequests.filter(

        r => r.status === 'REJECTED'

      ).length;
  }

  // ================================================
  // SEARCH
  // ================================================

  onSearch(): void {

    const searchLower =

      this.searchTerm.toLowerCase();

    this.filteredRequests =

      this.answeredRequests.filter(request =>

        request.requestCode
          ?.toLowerCase()
          .includes(searchLower)

        ||

        request.employeeName
          ?.toLowerCase()
          .includes(searchLower)

        ||

        request.destination
          ?.toLowerCase()
          .includes(searchLower)
      );
  }

  // ================================================
  // INITIALS
  // ================================================

  getInitials(name: string): string {

    return name

      ?.split(' ')

      .map(word => word[0])

      .join('')

      .toUpperCase();
  }

  // ================================================
  // FORMAT STATUS
  // ================================================

  formatStatus(status: string): string {

    return status
      .replace('_', ' ')
      .toUpperCase();
  }

  // ================================================
  // VIEW DETAILS
  // ================================================

  viewDetails(request: TravelRequest): void {

    this.selectedRequest = request;
  }

  // ================================================
  // CLOSE MODAL
  // ================================================

  closeModal(): void {

    this.selectedRequest = null;
  }

  // ================================================
  // DELETE REQUEST
  // ================================================

  deleteRequest(requestId: number): void {

    const confirmed = confirm(
      'Are you sure you want to delete this request?'
    );

    if (!confirmed) return;

    this.answeredRequests =

      this.answeredRequests.filter(
        r => r.id !== requestId
      );

    this.filteredRequests =

      this.filteredRequests.filter(
        r => r.id !== requestId
      );

    this.updateCounts();
  }

  // ================================================
  // CLEAR ALL
  // ================================================

  clearAll(): void {

    const confirmed = confirm(
      'Are you sure you want to clear all answered requests?'
    );

    if (!confirmed) return;

    this.answeredRequests = [];

    this.filteredRequests = [];

    this.updateCounts();
  }

  // ================================================
  // EXPORT CSV
  // ================================================

  exportCSV(): void {

    const headers = [

      'Request Code',
      'Employee Name',
      'Destination',
      'Start Date',
      'End Date',
      'Budget',
      'Status'
    ];

    const rows =

      this.answeredRequests.map(req => [

        req.requestCode,

        req.employeeName,

        req.destination,

        req.startDate,

        req.endDate,

        req.estimatedBudget,

        req.status
      ]);

    const csvContent = [

      headers.join(','),

      ...rows.map(row =>
        row.join(',')
      )

    ].join('\n');

    const blob = new Blob(

      [csvContent],

      {
        type:
        'text/csv;charset=utf-8;'
      }
    );

    const link =
      document.createElement('a');

    const url =
      URL.createObjectURL(blob);

    link.setAttribute('href', url);

    link.setAttribute(

      'download',

      `answered-requests-${
        new Date()
          .toISOString()
          .split('T')[0]
      }.csv`
    );

    link.style.visibility = 'hidden';

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  // ================================================
  // LOGOUT
  // ================================================

  logout(): void {

    const confirmed = confirm(
      'Are you sure you want to logout?'
    );

    if (confirmed) {

      this.router.navigate(['/login']);
    }
  }

  // ================================================
  // TRACK BY
  // ================================================

  trackByNavLabel(
    index: number,
    item: NavItem
  ): string {

    return item.label;
  }
}