import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinanceComponent } from "../finance/finance.component";
import { TravelRequestService }
from '../../services/travel-request.service';

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
  iconBg: string;
  iconColor: string;
  badge?: string;
  badgeColor?: string;
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
  styleUrls: ['./finance-decision-history.component.scss']
})
export class FinanceDecisionHistoryComponent implements OnInit {

  // ============================================
  // STATE
  // ============================================

  searchQuery = '';
  isDrawerOpen = false;
  selectedRow: TravelRow | null = null;
  defaultAvatar = AVATAR_SVG;

  currentUser: User = {
    name: 'Adrian Sterling',
    role: 'Finance Manager',
    avatar: AVATAR_SVG
  };

  filters: Filters = { status: '', department: '', date: '' };

  analyticsCards: AnalyticsCard[] = [
    {
      icon: 'all_inbox',
      iconBg: '#000',
      iconColor: '#fff',
      badge: '+12%',
      badgeColor: '#000',
      label: 'Total Requests',
      value: '1,284'
    },
    {
      icon: 'check_circle',
      iconBg: '#e2e2e2',
      iconColor: '#1b1b1b',
      badge: '+5.2%',
      badgeColor: '#454747',
      label: 'Approved',
      value: '892'
    },
    {
      icon: 'cancel',
      iconBg: '#ffdad6',
      iconColor: '#ba1a1a',
      badge: '-2.4%',
      badgeColor: '#ba1a1a',
      label: 'Rejected',
      value: '143'
    },
    {
      icon: 'hourglass_empty',
      iconBg: '#e2e2e2',
      iconColor: '#1b1b1b',
      label: 'Pending Audit',
      value: '249'
    }
  ];

  allRows: TravelRow[] = [];

  displayedRows: TravelRow[] = [];
  totalRows = 1284;
  currentPage = 1;
  totalPages = 5;

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

        const data =
          response.data || [];

        this.displayedRows =
          data.map((item: any) => ({

            id:
              item.requestCode,

            initials:
              item.employeeName
                ?.split(' ')
                .map((n: string) => n[0])
                .join(''),

            employee:
              item.employeeName,

            department:
              item.department,

            destination:
              item.destination,

            amount:
              item.estimatedBudget,

            date:
              item.startDate,

            status:
              this.mapStatus(item.status),

            statusLabel:
              item.status,

            avatarUrl:
              this.defaultAvatar,

            roleTitle:
              item.department +

              ' Employee',

            breakdown: [
              {
                label: 'Travel Budget',
                value: item.estimatedBudget
              }
            ],

            timeline: [
              {
                title:
                  'Request Submitted',

                by:
                  item.employeeName,

                date:
                  item.startDate,

                done: true
              }
            ],

            docs: []
          }));

        this.totalRows =
          this.displayedRows.length;
      },

      error: (error) => {

        console.log(error);
      }
    });
}

mapStatus(status: string):
  'approved'
  | 'rejected'
  | 'pending'
  | 'reimbursed'
  | 'audited' {

  switch(status) {

    case 'FINANCE_APPROVED':
      return 'approved';

    case 'REJECTED':
      return 'rejected';

    case 'BOOKED':
      return 'reimbursed';

    case 'COMPLETED':
      return 'audited';

    default:
      return 'pending';
  }
}
  // ============================================
  // SEARCH
  // ============================================

  onSearch(): void {
    const q = this.searchQuery.trim().toLowerCase();
    this.displayedRows = q
      ? this.allRows.filter(r =>
          r.id.toLowerCase().includes(q) ||
          r.employee.toLowerCase().includes(q) ||
          r.department.toLowerCase().includes(q))
      : [...this.allRows];
  }

  // ============================================
  // FILTERS
  // ============================================

  applyFilters(): void {
    this.displayedRows = this.allRows.filter(r => {
      if (this.filters.status     && r.status     !== this.filters.status)             return false;
      if (this.filters.department && r.department !== this.filters.department)         return false;
      return true;
    });
  }

  resetFilters(): void {
    this.filters = { status: '', department: '', date: '' };
    this.displayedRows = [...this.allRows];
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
    if (this.currentPage > 1) { this.currentPage--; }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) { this.currentPage++; }
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