/**
 * ACCOUNTABILITIES COMPONENT - Angular 18
 * Expense Review & Approvals Management
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ManagerComponent } from '../manager/manager.component';

// ================================================
// INTERFACES
// ================================================

interface ExpenseItem {
  id: string;
  type: 'flight' | 'hotel' | 'food' | 'misc';
  name: string;
  description: string;
  amount: number;
}

interface Submission {
  id: string;
  employeeId: string;
  employeeName: string;
  destination: string;
  totalAmount: number;
  submittedDate: Date;
  status: 'pending' | 'approved' | 'rejected';
  tripDates: string;
  purpose: string;
  currency: string;
  items: ExpenseItem[];
}

// ================================================
// COMPONENT
// ================================================

@Component({
  selector: 'app-accountabilities',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ManagerComponent],
  templateUrl: './show-accountabilities.component.html',
  styleUrls: ['./show-accountabilities.component.scss']
})
export class AccountabilitiesComponent implements OnInit {

  /* ============ USER INFO ============ */
  profileImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiC6f95UUkYy_WgpPeJO1lZATM60rmv_gxaPUe1yQlAf2OH7BnyFP7rINgzPOc3OOvxnd0Vwe4Wn5Zh1KYRlA9oCRt-ZPSw5iuOQQrAjeFm4GchKGb5Xhcfg1Qhb-OuEUyd00UbXfDwzj1If35C2EIpaOF5pNJbKThkpHfd3g24GQ6GPVif9IJOpa80-QanL1RWKvbw2fL16Ksl9PW5vH95mIb9-k5rFdXgbhmbF93Kmn4HmJ8yilKKF-r8BbE3NGR2SEPp_NoE0cB';

  /* ============ STATISTICS ============ */
  totalSubmissions = 124;
  pendingReview = 32;
  approvedToday = 18;
  rejectedMTD = 5;

  /* ============ FILTER & SORT ============ */
  statusFilter = 'all';
  sortBy = 'newest';
  searchTerm = '';

  /* ============ SUBMISSIONS DATA ============ */
  allSubmissions: Submission[] = [
    {
      id: '#EXP-9842',
      employeeId: 'EMP-0924',
      employeeName: 'Arjun Malhotra',
      destination: 'London, UK',
      totalAmount: 142500,
      submittedDate: new Date('2023-10-24'),
      status: 'pending',
      tripDates: 'Oct 12 - Oct 18, 2023',
      purpose: 'Q4 Client Summit',
      currency: 'INR (₹)',
      items: [
        {
          id: 'exp-1',
          type: 'flight',
          name: 'Travel (Flight)',
          description: 'Emirates Business Class',
          amount: 82000
        },
        {
          id: 'exp-2',
          type: 'hotel',
          name: 'Hotel',
          description: 'The Savoy (4 Nights)',
          amount: 45000
        },
        {
          id: 'exp-3',
          type: 'food',
          name: 'Food & Dining',
          description: 'Client Dinner & Daily Meals',
          amount: 12500
        },
        {
          id: 'exp-4',
          type: 'misc',
          name: 'Misc',
          description: 'Local Commute (Uber)',
          amount: 3000
        }
      ]
    },
    {
      id: '#EXP-9841',
      employeeId: 'EMP-0923',
      employeeName: 'Sarah Jenkins',
      destination: 'Dubai, UAE',
      totalAmount: 89200,
      submittedDate: new Date('2023-10-22'),
      status: 'approved',
      tripDates: 'Oct 15 - Oct 19, 2023',
      purpose: 'Client Meeting',
      currency: 'INR (₹)',
      items: [
        {
          id: 'exp-5',
          type: 'flight',
          name: 'Travel (Flight)',
          description: 'Business Class Flight',
          amount: 55000
        },
        {
          id: 'exp-6',
          type: 'hotel',
          name: 'Hotel',
          description: 'Atlantis The Palm (4 Nights)',
          amount: 28000
        },
        {
          id: 'exp-7',
          type: 'food',
          name: 'Food & Dining',
          description: 'Daily Meals',
          amount: 6200
        }
      ]
    },
    {
      id: '#EXP-9839',
      employeeId: 'EMP-0922',
      employeeName: 'David Chen',
      destination: 'Singapore',
      totalAmount: 54000,
      submittedDate: new Date('2023-10-20'),
      status: 'rejected',
      tripDates: 'Oct 10 - Oct 13, 2023',
      purpose: 'Training Program',
      currency: 'INR (₹)',
      items: [
        {
          id: 'exp-8',
          type: 'flight',
          name: 'Travel (Flight)',
          description: 'Economy Flight',
          amount: 35000
        },
        {
          id: 'exp-9',
          type: 'hotel',
          name: 'Hotel',
          description: 'Marina Bay Hotel (3 Nights)',
          amount: 19000
        }
      ]
    },
    {
      id: '#EXP-9838',
      employeeId: 'EMP-0921',
      employeeName: 'Priya Sharma',
      destination: 'New York, USA',
      totalAmount: 210000,
      submittedDate: new Date('2023-10-19'),
      status: 'approved',
      tripDates: 'Oct 05 - Oct 12, 2023',
      purpose: 'Annual Conference',
      currency: 'INR (₹)',
      items: [
        {
          id: 'exp-10',
          type: 'flight',
          name: 'Travel (Flight)',
          description: 'First Class Flight',
          amount: 120000
        },
        {
          id: 'exp-11',
          type: 'hotel',
          name: 'Hotel',
          description: 'The Plaza Hotel (7 Nights)',
          amount: 70000
        },
        {
          id: 'exp-12',
          type: 'food',
          name: 'Food & Dining',
          description: 'Conference Dinner',
          amount: 20000
        }
      ]
    }
  ];

  filteredSubmissions: Submission[] = [];
  selectedSubmission: Submission | null = null;
  showDetailModal = false;

  /* ============ PAGINATION ============ */
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;
  pageNumbers: number[] = [];
  paginationStart = 0;
  paginationEnd = 0;

  constructor() {}

  ngOnInit(): void {
    this.initializeData();
  }

  /**
   * Initialize component data
   */
  private initializeData(): void {
    this.filterAndSort();
    this.calculatePagination();
  }

  /**
   * Filter and sort submissions
   */
  filterAndSort(): void {
    let filtered = this.allSubmissions;

    // Apply status filter
    if (this.statusFilter !== 'all') {
      filtered = filtered.filter(s => s.status === this.statusFilter);
    }

    // Apply search filter
    if (this.searchTerm) {
      const search = this.searchTerm.toLowerCase();
      filtered = filtered.filter(s =>
        s.id.toLowerCase().includes(search) ||
        s.employeeName.toLowerCase().includes(search) ||
        s.destination.toLowerCase().includes(search)
      );
    }

    // Apply sort
    switch (this.sortBy) {
      case 'newest':
        filtered.sort((a, b) => b.submittedDate.getTime() - a.submittedDate.getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => a.submittedDate.getTime() - b.submittedDate.getTime());
        break;
      case 'high-to-low':
        filtered.sort((a, b) => b.totalAmount - a.totalAmount);
        break;
      case 'low-to-high':
        filtered.sort((a, b) => a.totalAmount - b.totalAmount);
        break;
    }

    this.filteredSubmissions = filtered;
    this.currentPage = 1;
    this.calculatePagination();
  }

  /**
   * Calculate pagination
   */
  private calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredSubmissions.length / this.itemsPerPage);
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginationStart = startIndex + 1;
    this.paginationEnd = Math.min(startIndex + this.itemsPerPage, this.filteredSubmissions.length);
  }

  /**
   * Get paginated submissions
   */
  get paginatedSubmissions(): Submission[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredSubmissions.slice(startIndex, startIndex + this.itemsPerPage);
  }

  /**
   * Go to page
   */
  goToPage(page: number): void {
    this.currentPage = page;
    this.calculatePagination();
  }

  /**
   * Previous page
   */
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.calculatePagination();
    }
  }

  /**
   * Next page
   */
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.calculatePagination();
    }
  }

  /**
   * View submission details
   */
  viewDetails(submission: Submission): void {
    this.selectedSubmission = submission;
    this.showDetailModal = true;
  }

  /**
   * Close modal
   */
  closeModal(): void {
    this.showDetailModal = false;
    this.selectedSubmission = null;
  }

  /**
   * Approve submission
   */
  approveSubmission(submission: Submission): void {
    const confirmed = confirm(`Approve expense claim ${submission.id}?`);
    if (!confirmed) return;

    submission.status = 'approved';
    this.approvedToday++;
    this.pendingReview--;
    this.filterAndSort();
    console.log(`✅ ${submission.id} approved`);
  }

  /**
   * Reject submission
   */
  rejectSubmission(submission: Submission): void {
    const confirmed = confirm(`Reject expense claim ${submission.id}?`);
    if (!confirmed) return;

    submission.status = 'rejected';
    this.rejectedMTD++;
    this.pendingReview--;
    this.filterAndSort();
    console.log(`❌ ${submission.id} rejected`);
  }

  /**
   * Get icon for expense type
   */
  getExpenseIcon(type: string): string {
    const icons: { [key: string]: string } = {
      flight: 'flight',
      hotel: 'hotel',
      food: 'restaurant',
      misc: 'more_horiz'
    };
    return icons[type] || 'receipt_long';
  }

  /**
   * Export to CSV
   */
  exportCSV(): void {
    const headers = ['ID', 'Employee', 'Destination', 'Amount', 'Submitted', 'Status'];
    const rows = this.filteredSubmissions.map(s => [
      s.id,
      s.employeeName,
      s.destination,
      `₹ ${s.totalAmount.toLocaleString()}`,
      s.submittedDate.toLocaleDateString(),
      s.status.toUpperCase()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `accountabilities-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}