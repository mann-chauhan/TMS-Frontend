import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { FinanceComponent } from '../finance/finance.component';

// ============================================
// INTERFACES
// ============================================

interface NavItem {
  id: string;
  label: string;
  icon: string;
  active: boolean;
}

interface User {
  name: string;
  avatar: string;
}

interface KPICard {
  label: string;
  value: string;
  trend?: {
    icon: string;
    value: string;
    type: 'positive' | 'negative' | 'neutral';
  };
}

interface PolicyAlert {
  id: string;
  title: string;
  description: string;
}

interface BarChartData {
  month: string;
  value: number;
  tooltip: string;
  isActive?: boolean;
}

interface DoughnutLegend {
  label: string;
  value: number;
  color: string;
}

interface TravelRequest {
  id: string;
  employee: {
    name: string;
    department: string;
    avatar?: string;
    position?: string;
    office?: string;
    tier?: string;
  };
  destination: string;
  dates: string;
  budget: number;
  managerStatus: 'approved' | 'pending' | 'rejected';
  financeStatus: 'approved' | 'pending' | 'escalated';
  isFlagged?: boolean;
  travelDetails?: {
    destination: string;
    duration: string;
    transport: string;
    accommodation: string;
  };
  breakdown?: Array<{ label: string; value: number }>;
  approvalFlow?: Array<{
    title: string;
    timestamp: string;
    comment?: string;
    status: 'completed' | 'pending';
  }>;
}

interface Filters {
  status: string;
  department: string;
  manager: string;
  budgetMin: number | null;
  budgetMax: number | null;
}

const avatarPlaceholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"%3E%3Crect width="96" height="96" rx="48" fill="%23e5e5e5"/%3E%3Ccircle cx="48" cy="38" r="16" fill="%23737373"/%3E%3Cpath d="M22 82c4-18 16-28 26-28s22 10 26 28" fill="%23737373"/%3E%3C/svg%3E';

// ============================================
// COMPONENT
// ============================================

@Component({
  selector: 'app-finance-approval-center',
  standalone: true,
  imports: [CommonModule, FormsModule, FinanceComponent],
  templateUrl: './finance-show-request.component.html',
  styleUrls: ['./finance-show-request.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideInOut', [
      state('void', style({ transform: 'translateX(100%)' })),
      state('*', style({ transform: 'translateX(0)' })),
      transition('void => *', animate('300ms ease-out')),
      transition('* => void', animate('300ms ease-in'))
    ])
  ]
})
export class FinanceApprovalCenterComponent implements OnInit {

  // ============================================
  // PROPERTIES
  // ============================================

  // Navigation
  navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', active: true },
    { id: 'requests', label: 'Requests', icon: 'assignment', active: false },
    { id: 'trips', label: 'Trips', icon: 'flight_takeoff', active: false },
    { id: 'settings', label: 'Settings', icon: 'settings', active: false }
  ];

  // Current User
  currentUser: User = {
    name: 'Admin',
    avatar: avatarPlaceholder
  };

  // Search
  searchQuery: string = '';

  // KPI Cards
  kpiCards: KPICard[] = [
    {
      label: 'Total Requests',
      value: '1,248',
      trend: { icon: 'trending_up', value: '12%', type: 'negative' }
    },
    {
      label: 'Pending Finance',
      value: '42',
      trend: { icon: 'pause', value: 'Steady', type: 'neutral' }
    },
    {
      label: 'Approved',
      value: '892',
      trend: { icon: 'trending_up', value: '5%', type: 'positive' }
    },
    {
      label: 'Rejected',
      value: '14',
      trend: { icon: 'trending_down', value: '2%', type: 'negative' }
    },
    {
      label: 'Total Budget',
      value: '$1.2M',
      trend: { icon: '', value: 'FY24 Q3', type: 'neutral' }
    },
    {
      label: 'Approved Amount',
      value: '$742k',
      trend: { icon: 'trending_up', value: '8%', type: 'positive' }
    }
  ];

  // Filters
  filters: Filters = {
    status: '',
    department: '',
    manager: '',
    budgetMin: null,
    budgetMax: null
  };

  // Policy Alerts
  policyAlerts: PolicyAlert[] = [
    {
      id: '1',
      title: 'Over-budget Request',
      description: 'TR-8492 exceeds department cap by 15%.'
    },
    {
      id: '2',
      title: 'Missing Accountability',
      description: 'TR-9011: No receipt attached for Flight.'
    },
    {
      id: '3',
      title: 'Duplicate Check',
      description: 'Potential duplicate found for Emily Watson.'
    }
  ];

  // Bar Chart Data
  barChartData: BarChartData[] = [
    { month: 'JAN', value: 40, tooltip: '$42k' },
    { month: 'FEB', value: 65, tooltip: '$65k' },
    { month: 'MAR', value: 85, tooltip: '$85k', isActive: true },
    { month: 'APR', value: 55, tooltip: '$55k' },
    { month: 'MAY', value: 75, tooltip: '$75k' },
    { month: 'JUN', value: 60, tooltip: '$60k' }
  ];

  maxBarValue: number = 100;

  // Doughnut Chart
  doughnutValue: number = 64;
  doughnutLegend: DoughnutLegend[] = [
    { label: 'Sales', value: 42, color: '#000000' },
    { label: 'Eng', value: 28, color: '#e2e2e2' }
  ];

  // Travel Requests
  allRequests: TravelRequest[] = [
    {
      id: 'TR-9421',
      employee: {
        name: 'Sarah Connor',
        department: 'Engineering',
        position: 'Senior Cloud Engineer',
        office: 'London Office',
        tier: 'Tier 1 Executive'
      },
      destination: 'Berlin, DE',
      dates: 'Oct 12 - Oct 16',
      budget: 3450,
      managerStatus: 'approved',
      financeStatus: 'pending',
      travelDetails: {
        destination: 'Berlin, Germany (Cloud Expo 2024)',
        duration: 'Oct 12, 2024 - Oct 16, 2024 (5 Days)',
        transport: 'Business Class Flight (BA241)',
        accommodation: 'Hotel Adlon Kempinski (4 Nights)'
      },
      breakdown: [
        { label: 'Airfare (Estimate)', value: 1850 },
        { label: 'Accommodation', value: 1200 },
        { label: 'Daily Allowance ($80 x 5)', value: 400 }
      ],
      approvalFlow: [
        {
          title: 'Submitted by Sarah Connor',
          timestamp: 'Oct 01, 2024 • 09:12 AM',
          status: 'completed'
        },
        {
          title: 'Approved by Alex Johnson (Manager)',
          timestamp: 'Oct 01, 2024 • 02:45 PM',
          comment: 'Critical attendance for Q4 cloud strategy.',
          status: 'completed'
        },
        {
          title: 'Finance Verification',
          timestamp: 'Pending',
          status: 'pending'
        }
      ]
    },
    {
      id: 'TR-8492',
      employee: {
        name: 'John Wick',
        department: 'Sales'
      },
      destination: 'Tokyo, JP',
      dates: 'Nov 01 - Nov 08',
      budget: 8120,
      managerStatus: 'approved',
      financeStatus: 'escalated',
      isFlagged: true
    }
  ];

  displayedRequests: TravelRequest[] = [];
  totalRequests: number = 42;
  currentPage: number = 1;
  totalPages: number = 5;
  itemsPerPage: number = 10;

  // Drawer
  isDrawerOpen: boolean = false;
  selectedRequest: TravelRequest | null = null;
  approvedAmount: number = 0;
  decisionRemarks: string = '';
  defaultAvatar: string = avatarPlaceholder;

  // ============================================
  // LIFECYCLE HOOKS
  // ============================================

  ngOnInit(): void {
    this.calculateMaxBarValue();
    this.loadRequests();
  }

  // ============================================
  // METHODS
  // ============================================

  calculateMaxBarValue(): void {
    this.maxBarValue = Math.max(...this.barChartData.map(d => d.value));
  }

  loadRequests(): void {
    this.displayedRequests = [...this.allRequests];
  }

  getDoughnutStyle(): { [key: string]: string } {
    const percentage = this.doughnutValue;
    const degrees = (percentage / 100) * 360;
    return {
      'clip-path': `polygon(50% 50%, 50% 0%, 100% 0%, 100% ${degrees > 90 ? '100%' : '0%'}, ${degrees > 180 ? '100%' : '0%'} 100%, ${degrees > 270 ? '0%' : '100%'} 100%, 0% ${degrees > 270 ? '100%' : '0%'}, 0% 0%, 50% 0%)`
    };
  }

  get visiblePages(): number[] {
    const pages: number[] = [];
    const maxVisible = 3;
    
    for (let i = 1; i <= Math.min(maxVisible, this.totalPages); i++) {
      pages.push(i);
    }
    
    return pages;
  }

  // ============================================
  // EVENT HANDLERS
  // ============================================

  setActiveNav(id: string): void {
    this.navItems.forEach(item => {
      item.active = item.id === id;
    });
    console.log('Navigation changed to:', id);
  }

  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      console.log('Logging out...');
      // Implement logout logic
    }
  }

  onSearch(): void {
    console.log('Searching for:', this.searchQuery);
    // Implement search logic
  }

  openNotifications(): void {
    console.log('Opening notifications');
  }

  openHelp(): void {
    console.log('Opening help');
  }

  exportData(): void {
    console.log('Exporting data');
    alert('Exporting data...');
  }

  openFilters(): void {
    console.log('Opening filters');
  }

  openReports(): void {
    console.log('Opening reports');
  }

  applyFilters(): void {
    console.log('Applying filters:', this.filters);
    // Implement filter logic
  }

  viewAlert(policyAlert: PolicyAlert): void {
    console.log('Viewing alert:', policyAlert);
    window.alert(`Alert: ${policyAlert.title}\n${policyAlert.description}`);
  }

  viewDetails(request: TravelRequest, event: Event): void {
    event.stopPropagation();
    this.openDrawer(request);
  }

  quickApprove(request: TravelRequest, event: Event): void {
    event.stopPropagation();
    if (confirm(`Quick approve request ${request.id}?`)) {
      console.log('Quick approved:', request.id);
      alert(`Request ${request.id} approved!`);
    }
  }

  quickReject(request: TravelRequest, event: Event): void {
    event.stopPropagation();
    if (confirm(`Quick reject request ${request.id}?`)) {
      console.log('Quick rejected:', request.id);
      alert(`Request ${request.id} rejected!`);
    }
  }

  openDrawer(request: TravelRequest): void {
    this.selectedRequest = request;
    this.approvedAmount = request.budget;
    this.decisionRemarks = '';
    this.isDrawerOpen = true;
  }

  closeDrawer(): void {
    this.isDrawerOpen = false;
    setTimeout(() => {
      this.selectedRequest = null;
    }, 300);
  }

  putOnHold(): void {
    if (!this.decisionRemarks.trim()) {
      alert('Please provide remarks for putting the request on hold.');
      return;
    }
    console.log('Put on hold:', this.selectedRequest?.id, this.decisionRemarks);
    alert(`Request ${this.selectedRequest?.id} put on hold.`);
    this.closeDrawer();
  }

  approveRequest(): void {
    console.log('Approved:', this.selectedRequest?.id, this.approvedAmount);
    alert(`Request ${this.selectedRequest?.id} approved for $${this.approvedAmount}!`);
    this.closeDrawer();
  }

  rejectRequest(): void {
    if (!this.decisionRemarks.trim()) {
      alert('Please provide remarks for rejection.');
      return;
    }
    console.log('Rejected:', this.selectedRequest?.id, this.decisionRemarks);
    alert(`Request ${this.selectedRequest?.id} rejected.`);
    this.closeDrawer();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadRequests();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadRequests();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadRequests();
  }
}
