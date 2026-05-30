import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  trigger,
  transition,
  style,
  animate,
  state
} from '@angular/animations';

import { FinanceComponent } from "../finance/finance.component";
import { TravelRequestService } from '../../services/travel-request.service';

@Component({
  selector: 'app-finance-show-request',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CurrencyPipe,
    UpperCasePipe,
    FinanceComponent
  ],
  templateUrl: './finance-show-request.component.html',
  styleUrls: ['./finance-show-request.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(8px)'
        }),
        animate(
          '250ms ease-out',
          style({
            opacity: 1,
            transform: 'translateY(0)'
          })
        )
      ])
    ]),

    trigger('slideInOut', [
      state(
        'void',
        style({
          transform: 'translateX(100%)'
        })
      ),

      state(
        '*',
        style({
          transform: 'translateX(0)'
        })
      ),

      transition(
        'void => *',
        animate('280ms ease-out')
      ),

      transition(
        '* => void',
        animate('280ms ease-in')
      )
    ])
  ]
})
export class FinanceApprovalCenterComponent
  implements OnInit {

  constructor(
    private travelRequestService:
      TravelRequestService
  ) { }

  currentUser = {
    name: 'Finance Admin',
    avatar:
      'https://i.pravatar.cc/150?img=12'
  };

  searchQuery = '';

  filters = {
    status: '',
    department: '',
    manager: '',
    budgetMin: null as number | null,
    budgetMax: null as number | null
  };

  allRequests: any[] = [];
  displayedRequests: any[] = [];

  totalRequests = 0;

  currentPage = 1;
  totalPages = 1;

  isDrawerOpen = false;

  selectedRequest: any = null;

  approvedAmount = 0;

  decisionRemarks = '';

  // Per-row remark drafts keyed by request id (fixes shared ngModel across the table).
  remarksById: Record<number, string> = {};

  defaultAvatar =
    'https://i.pravatar.cc/150?img=3';

  // KPI

  kpiCards = [
    {
      label: 'Total Requests',
      value: '0'
    },

    {
      label: 'Pending Finance',
      value: '0'
    },

    {
      label: 'Approved',
      value: '0'
    },

    {
      label: 'Rejected',
      value: '0'
    }
  ];

  // ALERTS

  policyAlerts = [
    {
      id: '1',
      title: 'Budget Monitoring',
      description:
        'Finance department monitoring active.'
    }
  ];

  // BAR CHART

  barChartData = [
    {
      month: 'JAN',
      value: 40,
      tooltip: '$40K'
    },

    {
      month: 'FEB',
      value: 70,
      tooltip: '$70K',
      isActive: true
    },

    {
      month: 'MAR',
      value: 50,
      tooltip: '$50K'
    }
  ];

  maxBarValue = 100;

  // DOUGHNUT

  doughnutValue = 64;

  doughnutLegend = [
    {
      label: 'Used',
      value: 64,
      color: '#111'
    },

    {
      label: 'Remaining',
      value: 36,
      color: '#d4d4d4'
    }
  ];

  ngOnInit(): void {

    setTimeout(() => {

      this.loadRequests();

    }, 100);
  }

  // =========================================
  // LOAD REQUESTS
  // =========================================

  private loadRequests(): void {

    this.travelRequestService
      .getFinanceRequests()
      .subscribe({

        next: (response: any) => {

          console.log(
            'FINANCE API RESPONSE',
            response
          );

          this.allRequests =
            (response.data || []).map((r: any) => ({

              ...r,

              roleTitle:
                r.roleTitle || 'Manager',

              requesterRole:

                r.employeeName === r.managerName
                  ? 'MANAGER'
                  : 'EMPLOYEE'
            }));

          this.displayedRequests = [
            ...this.allRequests
          ];

          this.totalRequests =
            this.displayedRequests.length;

          // IMPORTANT
          this.updateKpiCards();
        },

        error: (error) => {

          console.log(error);
        }
      });
  }

  // KPI UPDATE


  updateKpiCards(): void {

    const approved =
      this.allRequests.filter(
        r => r.status === 'FINANCE_APPROVED'
      ).length;

    const rejected =
      this.allRequests.filter(
        r => r.status === 'REJECTED'
      ).length;

    const pending =
      this.allRequests.filter(
        r => r.status === 'MANAGER_APPROVED'
      ).length;

    this.kpiCards = [

      {
        label: 'Total Requests',
        value: this.allRequests.length.toString()
      },

      {
        label: 'Pending Finance',
        value: pending.toString()
      },

      {
        label: 'Approved',
        value: approved.toString()
      },

      {
        label: 'Rejected',
        value: rejected.toString()
      }
    ];
  }

  // SEARCH


  onSearch(): void {

    const q =
      this.searchQuery
        .trim()
        .toLowerCase();

    this.displayedRequests =
      this.allRequests.filter(r =>

        r.requestCode
          ?.toLowerCase()
          .includes(q)

        ||

        r.employeeName
          ?.toLowerCase()
          .includes(q)
      );
  }

  // =========================================
  // FILTERS
  // =========================================

  applyFilters(): void {

    this.displayedRequests =
      this.allRequests.filter(r => {

        if (
          this.filters.status &&
          r.status !== this.filters.status
        ) {
          return false;
        }

        if (
          this.filters.budgetMin != null &&
          r.estimatedBudget <
          this.filters.budgetMin
        ) {
          return false;
        }

        if (
          this.filters.budgetMax != null &&
          r.estimatedBudget >
          this.filters.budgetMax
        ) {
          return false;
        }

        return true;
      });
  }

  // =========================================
  // TABLE ACTIONS
  // =========================================

  viewDetails(
    request: any,
    event: Event
  ): void {

    event.stopPropagation();

    this.openDrawer(request);
  }

  quickApprove(
    request: any,
    event: Event
  ): void {

    event.stopPropagation();

    this.selectedRequest = request;

    this.decisionRemarks =
      this.remarksById[request.id] || '';

    this.approveRequest();
  }

  quickReject(
    request: any,
    event: Event
  ): void {

    event.stopPropagation();

    this.selectedRequest = request;

    this.decisionRemarks =
      this.remarksById[request.id] || '';

    this.rejectRequest();
  }

  // =========================================
  // DRAWER
  // =========================================

  openDrawer(request: any): void {

    this.selectedRequest = request;

    this.approvedAmount =
      request.estimatedBudget;

    this.isDrawerOpen = true;
  }

  closeDrawer(): void {

    this.isDrawerOpen = false;

    setTimeout(() => {

      this.selectedRequest = null;

    }, 300);
  }

  // =========================================
  // APPROVE
  // =========================================

  approveRequest(): void {

    if (!this.selectedRequest) {
      return;
    }

    this.travelRequestService
      .financeApproveRequest(
        this.selectedRequest.id,
        this.decisionRemarks
      )
      .subscribe({

        next: () => {

          alert(
            'Request Approved Successfully'
          );

          this.closeDrawer();

          this.loadRequests();
        },

        error: (error: any) => {

          console.log(error);

          alert('Approval Failed');
        }
      });
  }

  // =========================================
  // REJECT
  // =========================================

  rejectRequest(): void {

    if (!this.selectedRequest) {
      return;
    }

    this.travelRequestService
.financeRejectRequest(
  this.selectedRequest.id,
  this.decisionRemarks
)
      .subscribe({

        next: () => {

          alert(
            'Request Rejected Successfully'
          );

          this.closeDrawer();

          this.loadRequests();
        },

        error: (error: any) => {

          console.log(error);

          alert('Rejection Failed');
        }
      });
  }

  // =========================================
  // EXTRA
  // =========================================

  exportData(): void {

    alert('Export Started');
  }

  openFilters(): void {

    console.log('Filters');
  }

  openReports(): void {

    console.log('Reports');
  }

  openNotifications(): void {

    console.log('Notifications');
  }

  openHelp(): void {

    console.log('Help');
  }

  viewAlert(alert: any): void {

    alert(alert.description);
  }

  putOnHold(): void {

    alert('Put On Hold');
  }

  // =========================================
  // PAGINATION
  // =========================================

  get visiblePages(): number[] {

    return [1];
  }

  previousPage(): void { }

  nextPage(): void { }

  goToPage(page: number): void { }

  getRoleBadge(role: string): string {

  if (role === 'MANAGER') {
    return 'Manager Request';
  }

  return 'Employee Request';
}
}
