import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { FinanceComponent } from '../finance/finance.component';

// ============================================
// INTERFACES
// ============================================

interface KPIData {
  label: string;
  value: string;
  icon: string;
  trend?: {
    value: string;
    type: 'positive' | 'negative' | 'neutral';
  };
  variant?: 'warning' | 'error';
  iconVariant?: 'error';
}

interface AlertData {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  iconVariant: 'error' | 'neutral';
  severity: 'high' | 'medium';
}

interface RequestData {
  id: string;
  employee: {
    name: string;
    avatar?: string;
  };
  department: string;
  budget: number;
  status: 'active' | 'flagged' | 'settled';
  managerApproved: boolean;
  financeStatus: 'pending' | 'denied' | 'approved';
  date: string;
  action: string;
}

interface BarChartData {
  month: string;
  value: number;
  isActive?: boolean;
}

interface ProgressData {
  label: string;
  value: number;
}

// ============================================
// COMPONENT
// ============================================

@Component({
  selector: 'finance-dashboard',
  standalone: true,
  imports: [CommonModule,FinanceComponent],
  templateUrl: './finance-dashboard.component.html',
  styleUrls: ['./finance-dashboard.component.scss'],
  animations: [
    trigger('progressAnimation', [
      transition(':enter', [
        style({ width: 0 }),
        animate('1s ease-out', style({ width: '*' }))
      ])
    ])
  ]
})
export class FinanceDashboardComponent implements OnInit {
  
  // ============================================
  // PROPERTIES
  // ============================================

  kpiData: KPIData[] = [
    {
      label: 'TOTAL REQUESTS',
      value: '1,284',
      icon: 'fact_check',
      trend: { value: '+12%', type: 'positive' }
    },
    {
      label: 'PENDING APPROVALS',
      value: '42',
      icon: 'pending_actions',
      trend: { value: 'Action required', type: 'neutral' },
      variant: 'warning'
    },
    {
      label: 'APPROVED',
      value: '1,102',
      icon: 'check_circle',
      trend: { value: '86% rate', type: 'positive' }
    },
    {
      label: 'REJECTED',
      value: '140',
      icon: 'cancel',
      trend: { value: '+4% vs LW', type: 'negative' }
    },
    {
      label: 'TOTAL BUDGET',
      value: '$2.4M',
      icon: 'payments',
      trend: { value: 'Annual cap', type: 'neutral' }
    },
    {
      label: 'REIMBURSEMENTS',
      value: '$412K',
      icon: 'receipt_long',
      trend: { value: '-2% spend', type: 'positive' }
    },
    {
      label: 'MONTHLY SPEND',
      value: '$185K',
      icon: 'calendar_month',
      trend: { value: '+8% surge', type: 'negative' }
    },
    {
      label: 'POLICY VIOLATIONS',
      value: '18',
      icon: 'warning',
      trend: { value: 'Critical', type: 'negative' },
      variant: 'error',
      iconVariant: 'error'
    }
  ];

  alertsData: AlertData[] = [
    {
      id: '1',
      title: 'Missing Receipt: Dinner Exp.',
      subtitle: 'Sarah Jenkins • $142.00',
      icon: 'receipt',
      iconVariant: 'error',
      severity: 'high'
    },
    {
      id: '2',
      title: 'Over-budget Flight Ticket',
      subtitle: 'Michael Ross • London-NYC',
      icon: 'trending_up',
      iconVariant: 'neutral',
      severity: 'medium'
    },
    {
      id: '3',
      title: 'Unauthorized Luxury Stay',
      subtitle: 'David Cho • Ritz Paris',
      icon: 'hotel',
      iconVariant: 'neutral',
      severity: 'high'
    }
  ];

  requestsData: RequestData[] = [
    {
      id: '#TR-8821',
      employee: { name: 'Alex Rivera' },
      department: 'Marketing',
      budget: 1450,
      status: 'active',
      managerApproved: true,
      financeStatus: 'pending',
      date: 'Oct 20, 2023',
      action: 'REVIEW'
    },
    {
      id: '#TR-8819',
      employee: { name: 'Linda Wu' },
      department: 'Engineering',
      budget: 3200,
      status: 'flagged',
      managerApproved: true,
      financeStatus: 'denied',
      date: 'Oct 19, 2023',
      action: 'DETAILS'
    },
    {
      id: '#TR-8815',
      employee: { name: 'Marcus Thorne' },
      department: 'Sales',
      budget: 840,
      status: 'settled',
      managerApproved: true,
      financeStatus: 'approved',
      date: 'Oct 18, 2023',
      action: 'ARCHIVE'
    }
  ];

  barChartData: BarChartData[] = [
    { month: 'JAN', value: 30 },
    { month: 'FEB', value: 45 },
    { month: 'MAR', value: 40 },
    { month: 'APR', value: 85, isActive: true },
    { month: 'MAY', value: 60 },
    { month: 'JUN', value: 75 }
  ];

  progressData: ProgressData[] = [
    { label: 'Processing Queue', value: 72 },
    { label: 'Audit Compliance', value: 94 },
    { label: 'Payment Disbursement', value: 48 }
  ];

  // Chart data
  approvalPercentage: number = 86;
  maxBarValue: number = 0;

  // Pagination
  currentPage: number = 1;
  totalPages: number = 51;
  totalRequests: number = 152;

  // ============================================
  // LIFECYCLE HOOKS
  // ============================================

  ngOnInit(): void {
    this.calculateMaxBarValue();
  }

  // ============================================
  // METHODS
  // ============================================

  calculateMaxBarValue(): void {
    this.maxBarValue = Math.max(...this.barChartData.map(d => d.value));
  }

  getDoughnutOffset(): number {
    const circumference = 2 * Math.PI * 60; // radius = 60
    const offset = circumference - (this.approvalPercentage / 100) * circumference;
    return offset;
  }

  // ============================================
  // EVENT HANDLERS
  // ============================================

  downloadSummary(): void {
    console.log('Download summary clicked');
    // Implement download logic
    alert('Downloading summary report...');
  }

  exportReport(): void {
    console.log('Export report clicked');
    // Implement export logic
    alert('Exporting full report...');
  }

  viewAlertDetails(alertData: AlertData): void {
    console.log('View alert details:', alertData);
    // Implement alert details view
    alert(`Viewing details for: ${alertData.title}`);
  }

  viewRequestDetails(request: RequestData): void {
    console.log('View request details:', request);
    // Navigate to request details or open modal
  }

  performAction(request: RequestData, event: Event): void {
    event.stopPropagation();
    console.log(`Performing action: ${request.action} on`, request);
    
    switch (request.action) {
      case 'REVIEW':
        this.reviewRequest(request);
        break;
      case 'DETAILS':
        this.viewDetails(request);
        break;
      case 'ARCHIVE':
        this.archiveRequest(request);
        break;
    }
  }

  private reviewRequest(request: RequestData): void {
    console.log('Reviewing request:', request.id);
    alert(`Opening review panel for ${request.id}`);
  }

  private viewDetails(request: RequestData): void {
    console.log('Viewing details:', request.id);
    alert(`Viewing details for ${request.id}`);
  }

  private archiveRequest(request: RequestData): void {
    console.log('Archiving request:', request.id);
    if (confirm(`Archive request ${request.id}?`)) {
      alert(`Request ${request.id} archived successfully`);
    }
  }

  openFilters(): void {
    console.log('Opening filters');
    // Implement filter panel
  }

  openTableMenu(): void {
    console.log('Opening table menu');
    // Implement menu options
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPageData(this.currentPage);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPageData(this.currentPage);
    }
  }

  private loadPageData(page: number): void {
    console.log(`Loading page ${page}`);
    // Implement API call to load page data
  }
}