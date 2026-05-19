/**
 * VIEW REQUESTS COMPONENT - Angular 18
 * Manager Console for Travel Request Management
 * 
 * Features:
 * - Request listing with filtering and search
 * - Status management (Approve/Reject)
 * - Pagination
 * - Statistics dashboard
 * - Export functionality
 * - Move approved/rejected requests to Answered page
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ManagerComponent } from '../manager/manager.component';

// ================================================
// INTERFACES
// ================================================

interface NavItem {
  label: string;
  icon: string;
  route: string;
  active: boolean;
}

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

// ================================================
// COMPONENT
// ================================================

@Component({
  selector: 'app-view-requests',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ManagerComponent],
  templateUrl: './view-requests.component.html',
  styleUrls: ['./view-requests.component.scss']
})
export class ViewRequestsComponent implements OnInit, OnDestroy {
  private readonly timeoutIds: number[] = [];
  private readonly ANSWERED_REQUESTS_KEY = 'answeredRequests';
  private readonly PENDING_REQUESTS_KEY = 'pendingRequests';

  /* ============ NAVIGATION ============ */
  navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard', active: false },
    { label: 'View Requests', icon: 'list_alt', route: '/requests', active: true },
    { label: 'Answered', icon: 'check_circle', route: '/answered', active: false },
    { label: 'Settings', icon: 'settings', route: '/settings', active: false }
  ];

  /* ============ USER INFO ============ */
  profileImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcF2cK-8D23AMj2Qi54mwPJhpBx6qZKIbVjJ2brJdvWlHeUO1hUKgUVFlb8gEZEv1vnrXFM4ePdly6cetz1yVsOlT4f42fDPZ8T8czoDuMN-74iuIQPHWZgy7VQJ5QYieeo5ExDuZCHAT-4E1WrRl1lnzmAk4vbAhj4Q_WeqB4eTxpmzPm-IWdmz82lv0By4PJfXdu7O-Ij7KqmhEqhrarF0YoDYVNspLHNx5nodipdgVNdvV30jS0ESbrgeRCGixjIkvZfjgFWRnW';

  /* ============ STATISTICS ============ */
  totalRequests = 128;
  pendingCount = 24;
  projectedBudget = 142500;

  /* ============ REQUESTS DATA ============ */
  allRequests: TravelRequest[] = [
    {
      id: 'TR-2904',
      employeeName: 'Julianne Arnett',
      destination: 'Singapore, SG',
      dates: 'Oct 12 - Oct 18',
      budget: 4200,
      status: 'pending'
    },
    {
      id: 'TR-2901',
      employeeName: 'Marcus Thorne',
      employeeImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsGksaYZHLY-E5ld3CV25HlETX3jW2eTLBKkaI8Vh8ugGws8M7C1dh5RaKHZaPoAA_1IznXyDBI0z7N1KY7VPiQesExwsESPXCuKwWaLmu7mgujjUTlw9SOR6E7Kdy1E3B1ZkYFuhzUuOtu8C_RvH_0ycT2vAqG_ZlgIHBcBFFKTPbnBdAIIIR_nn1GuFG8Oxs1KWQQA4Z-tLTJhq89EvCp3rX_WrUwIDmpdfSoxAl5a2PQ3JjD-moTVshkNvbrUMFfy-jDQYiZkG2',
      destination: 'London, UK',
      dates: 'Sep 28 - Oct 04',
      budget: 8120,
      status: 'pending'
    },
    {
      id: 'TR-2899',
      employeeName: 'Elena Lund',
      destination: 'Tokyo, JP',
      dates: 'Nov 01 - Nov 10',
      budget: 12450,
      status: 'pending'
    },
    {
      id: 'TR-2884',
      employeeName: 'David Chen',
      destination: 'Berlin, DE',
      dates: 'Aug 15 - Aug 18',
      budget: 1200,
      status: 'pending'
    },
    {
      id: 'TR-2880',
      employeeName: 'Sarah Jenkins',
      employeeImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7VxUr6cHba3f0yn8okT0I-QZjmR4p8ISVgyL_IJ890-i9k1WosYAbaVP5PCiE4aFCb8jDDk6qp6jWarDl6JCozQ0t3RH9x8WkGkclOK7z00ARCqYnS-wu_9GMF_BMvKyOnNP5B_MHsAPiDnYv2WBhryChLn5MNlT0tGqRg-zVDRGjfF846cazJ_v5yATu7zJvHKeXGKNn6EEK4LfyRuPycOeqJNRtdt8tHztkACg_ZweHLWJ9WiFM-lHtIP1a-YG9J_Ikv1lwj7Ua',
      destination: 'Paris, FR',
      dates: 'Oct 20 - Oct 25',
      budget: 5600,
      status: 'pending'
    },
    {
      id: 'TR-2875',
      employeeName: 'Michael Park',
      destination: 'Amsterdam, NL',
      dates: 'Oct 30 - Nov 02',
      budget: 3400,
      status: 'pending'
    },
    {
      id: 'TR-2870',
      employeeName: 'Jessica Wong',
      destination: 'Barcelona, ES',
      dates: 'Nov 05 - Nov 08',
      budget: 4900,
      status: 'pending'
    },
    {
      id: 'TR-2865',
      employeeName: 'Robert Brown',
      destination: 'Toronto, CA',
      dates: 'Nov 12 - Nov 16',
      budget: 6200,
      status: 'pending'
    }
  ];

  filteredRequests: TravelRequest[] = [];
  paginatedRequests: TravelRequest[] = [];

  /* ============ FILTERS ============ */
  searchTerm = '';

  /* ============ PAGINATION ============ */
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;
  pageNumbers: number[] = [];
  paginationStart = 0;
  paginationEnd = 0;
  totalFilteredRequests = 0;

  /* ============ UI STATE ============ */
  approvalMessage = '';
  isProcessing = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initializeData();
  }

  ngOnDestroy(): void {
    this.timeoutIds.forEach(timeoutId => window.clearTimeout(timeoutId));
  }

  /**
   * Initialize component data
   */
  private initializeData(): void {
    // Load pending requests from localStorage or use defaults
    this.loadPendingRequests();
    
    // Filter only pending requests
    this.filteredRequests = this.allRequests.filter(r => r.status === 'pending');
    this.totalFilteredRequests = this.filteredRequests.length;
    this.updatePendingCount();
    this.calculatePagination();
    this.updatePaginatedRequests();
  }

  /**
   * Load pending requests from localStorage
   */
  private loadPendingRequests(): void {
    const stored = localStorage.getItem(this.PENDING_REQUESTS_KEY);
    if (stored) {
      try {
        this.allRequests = JSON.parse(stored);
      } catch (e) {
        console.error('Error loading pending requests:', e);
        this.savePendingRequests();
      }
    } else {
      this.savePendingRequests();
    }
  }

  /**
   * Save pending requests to localStorage
   */
  private savePendingRequests(): void {
    localStorage.setItem(this.PENDING_REQUESTS_KEY, JSON.stringify(this.allRequests));
  }

  /**
   * Update pending count
   */
  private updatePendingCount(): void {
    this.pendingCount = this.allRequests.filter(r => r.status === 'pending').length;
  }

  /**
   * Handle search input
   */
  onSearch(): void {
    this.filterRequests();
  }

  /**
   * Filter requests based on search term
   */
  private filterRequests(): void {
    this.filteredRequests = this.allRequests
      .filter(r => r.status === 'pending')
      .filter(request => {
        const searchLower = this.searchTerm.toLowerCase();
        return (
          request.id.toLowerCase().includes(searchLower) ||
          request.employeeName.toLowerCase().includes(searchLower) ||
          request.destination.toLowerCase().includes(searchLower)
        );
      });

    this.totalFilteredRequests = this.filteredRequests.length;
    this.currentPage = 1;
    this.calculatePagination();
    this.updatePaginatedRequests();
  }

  /**
   * Calculate pagination
   */
  private calculatePagination(): void {
    this.totalPages = Math.ceil(this.totalFilteredRequests / this.itemsPerPage);
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    this.paginationStart = (this.currentPage - 1) * this.itemsPerPage + 1;
    this.paginationEnd = Math.min(this.currentPage * this.itemsPerPage, this.totalFilteredRequests);
  }

  /**
   * Update paginated requests
   */
  private updatePaginatedRequests(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedRequests = this.filteredRequests.slice(startIndex, endIndex);
  }

  /**
   * Go to specific page
   */
  goToPage(page: number): void {
    this.currentPage = page;
    this.calculatePagination();
    this.updatePaginatedRequests();
  }

  /**
   * Previous page
   */
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.calculatePagination();
      this.updatePaginatedRequests();
    }
  }

  /**
   * Next page
   */
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.calculatePagination();
      this.updatePaginatedRequests();
    }
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
   * Format status text
   */
  formatStatus(status: string): string {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  /**
   * View request details
   */
  viewRequest(request: TravelRequest): void {
    console.log('Viewing request:', request);
    this.router.navigate(['/requests', request.id]);
  }

  /**
   * Approve request and move to Answered page
   */
  approveRequest(request: TravelRequest): void {
    this.isProcessing = true;
    this.approvalMessage = `⏳ Approving ${request.id}...`;

    // Simulate API delay
    this.setManagedTimeout(() => {
      // Update request status with metadata
      const approvedRequest: TravelRequest = {
        ...request,
        status: 'approved',
        approvedAt: new Date(),
        approvedBy: 'Current Manager',
        notes: 'Approved via manager dashboard'
      };

      // Move to answered requests
      this.moveRequestToAnswered(approvedRequest);

      // Show success message
      this.approvalMessage = `${request.id} has been approved!`;

      // Clear message after 2.5 seconds
      this.setManagedTimeout(() => {
        this.approvalMessage = '';
        this.isProcessing = false;
      }, 2500);

    }, 800);
  }

  /**
   * Reject request and move to Answered page
   */
  rejectRequest(request: TravelRequest): void {
    const confirmed = confirm(`Are you sure you want to reject ${request.id}?`);
    if (!confirmed) {
      return;
    }

    this.isProcessing = true;
    // this.approvalMessage = `⏳ Rejecting ${request.id}...`;

    // Simulate API delay
    this.setManagedTimeout(() => {
      // Update request status with metadata
      const rejectedRequest: TravelRequest = {
        ...request,
        status: 'rejected',
        approvedAt: new Date(),
        approvedBy: 'Current Manager',
        notes: 'Rejected via manager dashboard'
      };

      // Move to answered requests
      this.moveRequestToAnswered(rejectedRequest);

      // Show success message
      // this.approvalMessage = `✅ ${request.id} has been rejected!`;

      // Clear message after 2.5 seconds
      this.setManagedTimeout(() => {
        // this.approvalMessage = '';
        this.isProcessing = false;
      }, 2500);

    }, 800);
  }

  /**
   * Move request to answered and remove from pending
   */
  private moveRequestToAnswered(request: TravelRequest): void {
    // Get existing answered requests
    const answeredData = localStorage.getItem(this.ANSWERED_REQUESTS_KEY);
    const answeredRequests: TravelRequest[] = answeredData ? JSON.parse(answeredData) : [];

    // Add the processed request
    answeredRequests.push(request);
    localStorage.setItem(this.ANSWERED_REQUESTS_KEY, JSON.stringify(answeredRequests));

    // Remove from pending requests
    const index = this.allRequests.findIndex(r => r.id === request.id);
    if (index !== -1) {
      this.allRequests.splice(index, 1);
      this.savePendingRequests();
    }

    // Update UI
    this.filterRequests();
    this.updatePendingCount();

    // Adjust pagination if necessary
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
      this.updatePaginatedRequests();
    }

    console.log(`✅ Request ${request.id} moved to answered:`, request);
  }

  /**
   * Toggle filter
   */
  toggleFilter(): void {
    console.log('Toggle filter');
  }

  /**
   * Export to CSV
   */
  exportCSV(): void {
    const csv = this.generateCSV();
    this.downloadCSV(csv);
  }

  /**
   * Generate CSV content
   */
  private generateCSV(): string {
    const headers = ['Request ID', 'Employee Name', 'Destination', 'Dates', 'Budget', 'Status'];
    const rows = this.filteredRequests.map(req => [
      req.id,
      req.employeeName,
      req.destination,
      req.dates,
      `$${req.budget}`,
      req.status
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    return csvContent;
  }

  /**
   * Download CSV file
   */
  private downloadCSV(csv: string): void {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `travel-requests-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  private setManagedTimeout(callback: () => void, delay: number): void {
    const timeoutId = window.setTimeout(() => {
      this.timeoutIds.splice(this.timeoutIds.indexOf(timeoutId), 1);
      callback();
    }, delay);

    this.timeoutIds.push(timeoutId);
  }

  /**
   * Toggle notifications
   */
  toggleNotifications(): void {
    console.log('Toggle notifications');
  }

  /**
   * Logout
   */
  logout(): void {
    const confirmed = confirm('Are you sure you want to logout?');
    if (confirmed) {
      // Clear data if needed
      // localStorage.removeItem(this.PENDING_REQUESTS_KEY);
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
