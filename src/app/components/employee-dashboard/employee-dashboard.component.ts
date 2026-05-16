import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeComponent } from '../employee/employee.component';

// ============================================
// Interfaces
// ============================================
interface KPIMetric {
  id: string;
  label: string;
  value: string | number;
  trend?: {
    text: string;
    type: 'up' | 'down' | 'neutral';
    icon?: string;
  };
  badge?: string;
  avatars?: number;
}

interface DepartmentSpend {
  name: string;
  amount: number;
  percentage: number;
}

interface Destination {
  city: string;
  trips: number;
  percentage: number;
}

interface BudgetItem {
  department: string;
  percentage: number;
}

interface ActivityFeed {
  id: string;
  employeeName: string;
  action: string;
  timestamp: string;
  isHighlight: boolean;
}

interface PendingApproval {
  id: string;
  employee: {
    name: string;
    role: string;
    avatar: string;
  };
  destination: string;
  cost: string;
  submitted: string;
}

// ============================================
// Component
// ============================================
@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, EmployeeComponent],
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class employeeDashboardComponent implements OnInit {
  // ============================================
  // Properties
  // ============================================
  currentUser = {
    name: 'Director',
    avatar: 'https://i.pravatar.cc/150?img=68',
    role: 'Manager'
  };

  searchQuery = '';
  hasNotifications = true;
  activeChartView: 'weekly' | 'monthly' = 'monthly';

  // KPI Metrics
  kpiMetrics: KPIMetric[] = [
    {
      id: 'spend',
      label: 'TOTAL TEAM SPEND',
      value: '$142,850.00',
      trend: {
        text: '4.2% FROM LAST MONTH',
        type: 'down',
        icon: 'trending_down'
      }
    },
    {
      id: 'requests',
      label: 'ACTIVE REQUESTS',
      value: 18,
      badge: 'Awaiting Approval'
    },
    {
      id: 'trips',
      label: 'COMPLETED TRIPS (MTD)',
      value: 42,
      trend: {
        text: 'Target: 50',
        type: 'neutral'
      }
    },
    {
      id: 'outofoffice',
      label: 'OUT-OF-OFFICE TODAY',
      value: 12,
      avatars: 9
    }
  ];

  // Department Spending
  departmentSpending: DepartmentSpend[] = [
    { name: 'ENGINEERING', amount: 42000, percentage: 80 },
    { name: 'SALES', amount: 52000, percentage: 100 },
    { name: 'MARKETING', amount: 33800, percentage: 65 },
    { name: 'PRODUCT', amount: 23400, percentage: 45 },
    { name: 'LEGAL', amount: 39000, percentage: 75 },
    { name: 'OPS', amount: 15600, percentage: 30 },
    { name: 'DESIGN', amount: 46800, percentage: 90 }
  ];

  // Policy Compliance
  policyCompliance = {
    percentage: 92,
    rating: 'RATING'
  };

  // Top Destinations
  topDestinations: Destination[] = [
    { city: 'London', trips: 24, percentage: 80 },
    { city: 'New York', trips: 18, percentage: 60 },
    { city: 'Singapore', trips: 12, percentage: 40 }
  ];

  // Budget Utilization
  budgetItems: BudgetItem[] = [
    { department: 'Global Operations', percentage: 78 },
    { department: 'Tech Research', percentage: 42 }
  ];

  // Activity Feed
  activityFeed: ActivityFeed[] = [
    {
      id: '1',
      employeeName: 'Sarah Jenkins',
      action: 'checked into 1 Hotel Mayfair, London.',
      timestamp: '12 MIN AGO',
      isHighlight: true
    },
    {
      id: '2',
      employeeName: 'David Chen',
      action: 'submitted accountability report for SF Summit.',
      timestamp: '2 HOURS AGO',
      isHighlight: false
    },
    {
      id: '3',
      employeeName: 'Emily Wong',
      action: 'flight to Tokyo departed on time.',
      timestamp: '4 HOURS AGO',
      isHighlight: true
    }
  ];

  // Pending Approvals
  pendingApprovals: PendingApproval[] = [
    {
      id: '1',
      employee: {
        name: 'Amanda Vance',
        role: 'Senior Product Designer',
        avatar: 'https://i.pravatar.cc/150?img=47'
      },
      destination: 'Berlin, DE',
      cost: '$2,840.50',
      submitted: 'Aug 24, 2023'
    },
    {
      id: '2',
      employee: {
        name: 'Julian Marcus',
        role: 'VP of Sales',
        avatar: 'https://i.pravatar.cc/150?img=12'
      },
      destination: 'Singapore, SG',
      cost: '$8,120.00',
      submitted: 'Aug 23, 2023'
    },
    {
      id: '3',
      employee: {
        name: 'Linnea Holm',
        role: 'Project Manager',
        avatar: 'https://i.pravatar.cc/150?img=45'
      },
      destination: 'Oslo, NO',
      cost: '$1,450.25',
      submitted: 'Aug 23, 2023'
    }
  ];

  // ============================================
  // Lifecycle
  // ============================================
  constructor() {}

  ngOnInit(): void {
    // Initialize dashboard
  }

  // ============================================
  // Actions
  // ============================================
  onSearch(): void {
    console.log('Search:', this.searchQuery);
  }

  onNavigate(route: string): void {
    console.log('Navigate to:', route);
  }

  onLogout(): void {
    console.log('Logout');
  }

  onApprove(approval: PendingApproval): void {
    console.log('Approving:', approval);
    alert(`Approved travel for ${approval.employee.name}`);
  }

  onDeny(approval: PendingApproval): void {
    console.log('Denying:', approval);
    if (confirm(`Are you sure you want to deny ${approval.employee.name}'s request?`)) {
      alert('Request denied');
    }
  }

  onViewAllRequests(): void {
    console.log('Viewing all requests');
  }

  onAdjustBudget(): void {
    console.log('Adjusting budget limits');
  }

  onToggleChartView(view: 'weekly' | 'monthly'): void {
    this.activeChartView = view;
  }

  // ============================================
  // Helpers
  // ============================================
  getBarHeight(percentage: number): string {
    return `${percentage}%`;
  }

  formatCurrency(amount: number): string {
    return `$${(amount / 1000).toFixed(0)}k`;
  }

  getStrokeDasharray(percentage: number): string {
    return `${percentage}, 100`;
  }
}