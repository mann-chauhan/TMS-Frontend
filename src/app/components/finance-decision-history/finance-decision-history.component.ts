import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinanceComponent } from "../finance/finance.component";
import { TravelRequestService }
from '../../services/travel-request.service';
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';

// ============================================
// INTERFACES
// ============================================

interface User {
  name: string;
  role: string;
  avatar: string;
}

interface AnalyticsCard {
  icon: string;
  tone: 'dark' | 'success' | 'danger' | 'neutral';
  label: string;
  value: string;
}

interface BreakdownItem {
  label: string;
  value: number;
}

interface TimelineStep {
  title: string;
  by: string;
  date: string;
  done: boolean;
}

interface DocItem {
  name: string;
  preview: string;
}

interface TravelRow {
  id: string;
  initials: string;
  employee: string;
  department: string;
  destination: string;
  amount: number;
  date: string;
  status: 'approved' | 'rejected' | 'pending' | 'reimbursed' | 'audited';
  statusLabel: string;
  avatarUrl?: string;
  roleTitle?: string;
  breakdown?: BreakdownItem[];
  timeline?: TimelineStep[];
  docs?: DocItem[];
  hovered?: boolean;
}

interface Filters {
  status: string;
  department: string;
  date: string;
}

type FinanceStatus = TravelRow['status'];

// ============================================
// PLACEHOLDER SVG AVATAR
// ============================================

const AVATAR_SVG =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"%3E' +
  '%3Crect width="96" height="96" rx="12" fill="%23e8e8e8"/%3E' +
  '%3Ccircle cx="48" cy="36" r="16" fill="%23a3a3a3"/%3E' +
  '%3Cpath d="M20 80c4-20 18-30 28-30s24 10 28 30" fill="%23a3a3a3"/%3E' +
  '%3C/svg%3E';

// ============================================
// COMPONENT
// ============================================

@Component({
  selector: 'app-finance-decision-history',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe, FinanceComponent],
  templateUrl: './finance-decision-history.component.html',
  styleUrls: ['./finance-decision-history.component.scss'],
  animations: [

  trigger('progressAnimation', [

    transition(':enter', [

      style({
        width: '0%'
      }),

      animate(
        '800ms ease',
        style({
          width: '*'
        })
      )

    ])

  ])

]
})
export class FinanceDecisionHistoryComponent implements OnInit {

  // ============================================
  // STATE
  // ============================================

  searchQuery = '';
  isDrawerOpen = false;
  selectedRequest: any = null;
  selectedRow: TravelRow | null = null;
  defaultAvatar = AVATAR_SVG;

  currentUser: User = {
    name: 'Adrian Sterling',
    role: 'Finance Manager',
    avatar: AVATAR_SVG
  };

  filters: Filters = { status: '', department: '', date: '' };

  analyticsCards: AnalyticsCard[] = [];

  allRows: TravelRow[] = [];
  filteredRows: TravelRow[] = [];
  displayedRows: TravelRow[] = [];
  departments: string[] = [];
  totalRows = 0;
  currentPage = 1;
  totalPages = 1;
  readonly pageSize = 10;

  constructor(
  private travelRequestService:
    TravelRequestService
) {}

  // ============================================
  // LIFECYCLE
  // ============================================

ngOnInit(): void {

  this.loadFinanceHistory();
}

loadFinanceHistory(): void {

  this.travelRequestService
    .getFinanceDecisionHistory()
    .subscribe({

      next: (response: any) => {

        console.log(
          'FINANCE HISTORY',
          response
        );

        const data = Array.isArray(response)
          ? response
          : response.data || [];

        this.allRows = data.map((item: any) =>
          this.toTravelRow(item)
        );
        this.departments = Array.from(
          new Set(
            this.allRows
              .map(row => row.department)
              .filter(Boolean)
          )
        ).sort();

        this.updateAnalytics();
        this.applyFilters();
      },

      error: (error) => {

        console.log(error);
      }
    });
}

  private toTravelRow(item: any): TravelRow {
    const status = this.mapStatus(item.status);
    const employee = item.employeeName || 'Unknown Employee';
    const department = item.department || 'Unassigned';
    const requestDate = item.financeDecisionDate || item.updatedAt || item.startDate || '';

    return {
      id: item.requestCode || String(item.id || 'N/A'),
      initials: this.getInitials(employee),
      employee,
      department,
      destination: item.destination || item.toLocation || 'Not specified',
      amount: Number(item.estimatedBudget || item.amount || 0),
      date: requestDate,
      status,
      statusLabel: this.getStatusLabel(status),
      avatarUrl: this.defaultAvatar,
      roleTitle: `${department} Employee`,
      breakdown: [
        {
          label: 'Travel Budget',
          value: Number(item.estimatedBudget || item.amount || 0)
        }
      ],
      timeline: this.buildTimeline(item, status, requestDate),
      docs: []
    };
  }

  private buildTimeline(item: any, status: FinanceStatus, requestDate: string): TimelineStep[] {
    const employee = item.employeeName || 'Employee';
    const managerDate = item.managerDecisionDate || item.startDate || requestDate;

    return [
      {
        title: 'Request Submitted',
        by: employee,
        date: item.startDate || requestDate,
        done: true
      },
      {
        title: 'Manager Approved',
        by: item.managerName || 'Manager',
        date: managerDate,
        done: true
      },
      {
        title: this.getStatusLabel(status),
        by: item.financeName || 'Finance Team',
        date: requestDate,
        done: status !== 'pending'
      }
    ];
  }

  private getInitials(name: string): string {
    return name
      .split(' ')
      .filter(Boolean)
      .map(part => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'NA';
  }

mapStatus(status: string): FinanceStatus {

  switch(status) {

    case 'FINANCE_APPROVED':
    case 'APPROVED':
      return 'approved';

    case 'FINANCE_REJECTED':
    case 'REJECTED':
      return 'rejected';

    case 'REIMBURSED':
    case 'BOOKED':
      return 'reimbursed';

    case 'AUDITED':
    case 'COMPLETED':
      return 'audited';

    default:
      return 'pending';
  }
}

  private getStatusLabel(status: FinanceStatus): string {
    const labels: Record<FinanceStatus, string> = {
      approved: 'Approved',
      rejected: 'Rejected',
      pending: 'Pending',
      reimbursed: 'Reimbursed',
      audited: 'Audited'
    };

    return labels[status];
  }

  private updateAnalytics(): void {
    const counts = this.allRows.reduce(
      (acc, row) => {
        acc.total++;
        acc[row.status]++;
        return acc;
      },
      {
        total: 0,
        approved: 0,
        rejected: 0,
        pending: 0,
        reimbursed: 0,
        audited: 0
      }
    );

    this.analyticsCards = [
      {
        icon: 'all_inbox',
        tone: 'dark',
        label: 'Total Requests',
        value: counts.total.toString()
      },
      {
        icon: 'check_circle',
        tone: 'success',
        label: 'Approved',
        value: counts.approved.toString()
      },
      {
        icon: 'cancel',
        tone: 'danger',
        label: 'Rejected',
        value: counts.rejected.toString()
      },
      {
        icon: 'pending_actions',
        tone: 'neutral',
        label: 'Pending',
        value: counts.pending.toString()
      }
    ];
  }

  private normalizeDate(value: string): string {
    if (!value) {
      return '';
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value.slice(0, 10);
    }

    return date.toISOString().slice(0, 10);
  }

  private refreshDisplayedRows(): void {
    this.totalRows = this.filteredRows.length;
    this.totalPages = Math.max(1, Math.ceil(this.totalRows / this.pageSize));

    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }

    const start = (this.currentPage - 1) * this.pageSize;
    this.displayedRows = this.filteredRows.slice(start, start + this.pageSize);
  }
  // ============================================
  // SEARCH
  // ============================================

  onSearch(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  // ============================================
  // FILTERS
  // ============================================

  onFilterChange(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  applyFilters(): void {
    const q = this.searchQuery.trim().toLowerCase();

    this.filteredRows = this.allRows.filter(r => {
      if (q && ![
        r.id,
        r.employee,
        r.department,
        r.destination,
        r.statusLabel
      ].some(value => value.toLowerCase().includes(q))) {
        return false;
      }

      if (this.filters.status && r.status !== this.filters.status) {
        return false;
      }

      if (this.filters.department && r.department !== this.filters.department) {
        return false;
      }

      if (this.filters.date && this.normalizeDate(r.date) !== this.filters.date) {
        return false;
      }

      return true;
    });

    this.refreshDisplayedRows();
  }

  resetFilters(): void {
    this.filters = { status: '', department: '', date: '' };
    this.searchQuery = '';
    this.currentPage = 1;
    this.applyFilters();
  }

  // ============================================
  // TOPBAR ACTIONS
  // ============================================

  openNotifications(): void { console.log('Notifications'); }
  openHelp():          void { console.log('Help'); }

  // ============================================
  // TABLE ACTIONS
  // ============================================

  exportReports(): void { alert('Exporting reports...'); }

  // ============================================
  // PAGINATION
  // ============================================

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.refreshDisplayedRows();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.refreshDisplayedRows();
    }
  }

  // ============================================
  // DRAWER
  // ============================================

  openDrawer(row: TravelRow): void {
    this.selectedRow  = row;
    this.isDrawerOpen = true;
  }

  closeDrawer(): void {
    this.isDrawerOpen = false;
    setTimeout(() => { this.selectedRow = null; }, 480);
  }

  downloadAudit(): void  { alert(`Downloading audit for ${this.selectedRow?.id}`); }
  printSummary():  void  { window.print(); }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isDrawerOpen) { this.closeDrawer(); }
  }
}
