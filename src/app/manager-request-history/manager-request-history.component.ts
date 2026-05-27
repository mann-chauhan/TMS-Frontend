import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ManagerComponent } from "../components/manager/manager.component";
import { TravelRequestService }
from '../services/travel-request.service';

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
  tone: 'dark' | 'success' | 'warning' | 'danger';
  badge?: string;
  label: string;
  value: string;
  progress: string;
}

interface BreakdownItem {
  label: string;
  value: number;
}

interface TimelineStep {
  title: string;
  description: string;
  time?: string;
  done: boolean;
}

interface TravelRow {
  id: string;
  initials: string;
  employee: string;
  roleTitle: string;
  department: string;
  destination: string;
  dates: string;
  nights: number;
  budget: number;
  status: 'approved' | 'pending' | 'rejected' | 'escalated';
  statusLabel: string;
  breakdown: BreakdownItem[];
  timeline: TimelineStep[];
  hovered?: boolean;
}

interface ActivityItem {
  icon: string;
  title: string;
  description: string;
  time: string;
  type: 'success' | 'info';
}

interface Filters {
  department: string;
  status: string;
}

// ============================================
// PLACEHOLDER AVATAR
// ============================================

const AVATAR_SVG =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="96" height="96"%3E' +
  '%3Crect width="96" height="96" rx="48" fill="%23e4e4e7"/%3E' +
  '%3Ccircle cx="48" cy="36" r="16" fill="%23a1a1aa"/%3E' +
  '%3Cpath d="M20 80c4-20 18-30 28-30s24 10 28 30" fill="%23a1a1aa"/%3E%3C/svg%3E';

// ============================================
// COMPONENT
// ============================================

@Component({
  selector: 'app-manager-request-history',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe, ManagerComponent],
  templateUrl: './manager-request-history.component.html',
  styleUrls: ['./manager-request-history.component.scss']
})
export class ManagerRequestHistoryComponent implements OnInit {

  constructor(
  private travelRequestService:
  TravelRequestService
) {}

  // ============================================
  // STATE
  // ============================================

  searchQuery = '';
  isDrawerOpen = false;
  selectedRow: TravelRow | null = null;
  departments: string[] = [];

  currentUser: User = {
    name: 'Julian Voss',
    role: 'Regional Director',
    avatar: AVATAR_SVG
  };

  filters: Filters = { department: '', status: '' };

  analyticsCards: AnalyticsCard[] = [];

  activityFeed: ActivityItem[] = [
    {
      icon: 'check_circle',
      title: 'Automatic Approval Triggered',
      description: "Request #TRV-8821 met all policy criteria for 'Low-Tier Regional Travel'. Approved by system.",
      time: '14 MINS AGO',
      type: 'success'
    },
    {
      icon: 'description',
      title: 'Policy Document Updated',
      description: "New 'EMEA Hospitality Guidelines v3.1' have been applied to all pending Singapore requests.",
      time: '2 HOURS AGO',
      type: 'info'
    }
  ];

  avatarStack = ['JD', 'KL', '+8'];
  allRows: TravelRow[] = [];
    

  displayedRows: TravelRow[] = [];
  filteredRows: TravelRow[] = [];
  totalRows = 0;
  currentPage = 1;
  totalPages  = 1;
  readonly pageSize = 10;

  // ============================================
  // LIFECYCLE
  // ============================================

 ngOnInit(): void {

  this.loadManagerHistory();
}

loadManagerHistory(): void {

  const managerId = 2;

  this.travelRequestService
    .getManagerRequestHistory(managerId)

    .subscribe({

      next: (response: any) => {

        const data = response.data || [];

        this.allRows = data.map((item: any) => {

          return {

            id: item.requestCode,

            initials:
              item.employeeName
                ?.split(' ')
                .map((n: string) => n[0])
                .join('')
                .toUpperCase(),

            employee:
              item.employeeName,

            roleTitle:
              'Department Manager',

            department:
              item.department,

            destination:
              item.destination,

            dates:
              `${item.startDate} - ${item.endDate}`,

            nights: 5,

            budget:
              item.estimatedBudget,

            status:
              this.mapStatus(item.status),

            statusLabel:
              item.status
                ?.replace('_', ' '),

            breakdown: [
              {
                label: 'Travel Expense',
                value: item.estimatedBudget
              }
            ],

            timeline: [
              {
                title: 'Manager Submitted',
                description:
                  'Request created directly by manager',
                done: true
              },
              {
                title: 'Finance Review',
                description:
                  'Finance reviewing request',
                done:
                  item.status ===
                  'FINANCE_APPROVED'
              }
            ]
          };
        });

        this.departments = Array.from(
          new Set(
            this.allRows.map(
              row => row.department
            )
          )
        );

        this.updateAnalytics();

        this.applyFilters();
      },

      error: (error: any) => {

        console.error(
          'Failed to load manager history',
          error
        );
      }
    });
}

mapStatus(status: string):
'approved'
| 'pending'
| 'rejected'
| 'escalated' {

  switch(status) {

    case 'FINANCE_APPROVED':
      return 'approved';

    case 'REJECTED':
      return 'rejected';

    case 'MANAGER_APPROVED':
      return 'pending';

    default:
      return 'pending';
  }
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
        r.roleTitle,
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

      return true;
    });

    this.refreshDisplayedRows();
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.filters = { department: '', status: '' };
    this.currentPage = 1;
    this.applyFilters();
  }

  // ============================================
  // TOPBAR ACTIONS
  // ============================================

  openNotifications(): void { console.log('Notifications'); }
  openHelp():          void { console.log('Help'); }

  // ============================================
  // EXPORT
  // ============================================

  exportReport(): void { alert('Exporting report...'); }

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

  private refreshDisplayedRows(): void {
    this.totalRows = this.filteredRows.length;
    this.totalPages = Math.max(1, Math.ceil(this.totalRows / this.pageSize));

    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }

    const start = (this.currentPage - 1) * this.pageSize;
    this.displayedRows = this.filteredRows.slice(start, start + this.pageSize);
  }

  private updateAnalytics(): void {
    const total = this.allRows.length;
    const approved = this.countStatus('approved');
    const pending = this.countStatus('pending');
    const quarterlySpend = this.allRows.reduce((sum, row) => sum + row.budget, 0);

    this.analyticsCards = [
      {
        icon: 'all_inbox',
        tone: 'dark',
        label: 'TOTAL REQUESTS',
        value: total.toString(),
        progress: '100%'
      },
      {
        icon: 'verified',
        tone: 'success',
        badge: `${this.getPercent(approved, total)}% RATIO`,
        label: 'APPROVED',
        value: approved.toString(),
        progress: `${this.getPercent(approved, total)}%`
      },
      {
        icon: 'hourglass_top',
        tone: 'warning',
        label: 'PENDING REVIEW',
        value: pending.toString(),
        progress: `${this.getPercent(pending, total)}%`
      },
      {
        icon: 'account_balance_wallet',
        tone: 'danger',
        badge: 'INR',
        label: 'QUARTERLY SPEND',
        value: `₹${(quarterlySpend / 1000).toFixed(1)}k`,
        progress: '50%'
      }
    ];
  }

  private countStatus(status: TravelRow['status']): number {
    return this.allRows.filter(row => row.status === status).length;
  }

  private getPercent(value: number, total: number): number {
    return total ? Math.round((value / total) * 100) : 0;
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
    setTimeout(() => { this.selectedRow = null; }, 400);
  }

  modifyRequest(): void { alert(`Modifying ${this.selectedRow?.id}`); }
  printDossier():  void { window.print(); }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isDrawerOpen) { this.closeDrawer(); }
  }
}
