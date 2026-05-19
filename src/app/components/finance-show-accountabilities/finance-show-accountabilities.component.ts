import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FinanceComponent } from '../finance/finance.component';

type Status = 'Completed' | 'Pending' | 'Escalated' | 'In Review';

interface Metric {
  label: string;
  value: string;
  icon: string;
  note: string;
  tone?: 'danger' | 'success' | 'critical';
}

interface Responsibility {
  initials: string;
  employee: string;
  department: string;
  responsibility: string;
  deadline: string;
  status: Status;
}

interface ProgressItem {
  label: string;
  value: number;
}

interface TimelineItem {
  title: string;
  description: string;
  time: string;
  isError?: boolean;
}

@Component({
  selector: 'app-finance-show-accountabilities',
  standalone: true,
  imports: [CommonModule, FinanceComponent],
  templateUrl: './finance-show-accountabilities.component.html',
  styleUrls: ['./finance-show-accountabilities.component.scss']
})
export class FinanceShowAccountabilitiesComponent {
  metrics: Metric[] = [
    { label: 'Total Pending Reviews', value: '42', icon: 'pending_actions', note: 'Needs attention', tone: 'danger' },
    { label: 'Approved Requests', value: '1,284', icon: 'verified', note: '86% success rate', tone: 'success' },
    { label: 'Budget Violations', value: '18', icon: 'warning', note: 'Critical', tone: 'critical' },
    { label: 'Employee Compliance', value: '94%', icon: 'rule', note: 'Excellent', tone: 'success' }
  ];

  responsibilities: Responsibility[] = [
    { initials: 'JD', employee: 'Julian De Luca', department: 'Global Logistics', responsibility: 'Quarterly Audit Rev.', deadline: 'Oct 12, 2024', status: 'Completed' },
    { initials: 'SK', employee: 'Sienna Kincaid', department: 'Exec. Strategy', responsibility: 'Vendor Settlement', deadline: 'Oct 15, 2024', status: 'Pending' },
    { initials: 'MB', employee: 'Marcus Beaumont', department: 'Finance', responsibility: 'Budget Realignment', deadline: 'Oct 08, 2024', status: 'Escalated' },
    { initials: 'AL', employee: 'Aria Laurent', department: 'Procurement', responsibility: 'SLA Compliance Check', deadline: 'Oct 18, 2024', status: 'In Review' }
  ];

  progressItems: ProgressItem[] = [
    { label: 'Budget Tracking', value: 92 },
    { label: 'Reimbursement', value: 78 },
    { label: 'Policy Compliance', value: 96 },
    { label: 'Vendor Payments', value: 64 }
  ];

  timeline: TimelineItem[] = [
    { title: 'Budget approved for Q4 Infrastructure', description: 'Verified by Executive Finance Board. Allocation: $4.2M', time: '2 hours ago' },
    { title: 'Reimbursement verified for Project Phoenix', description: 'Batch #4829 successfully processed through compliance filters.', time: '6 hours ago' },
    { title: 'Policy updated: Corporate Travel Tier 1', description: 'Updated daily per-diem rates for international executive transit.', time: 'Yesterday' },
    { title: 'Vendor payment released to Oracle Cloud', description: 'Annual subscription renewal settled. Transaction ref: TMS-82910.', time: 'Oct 04, 2024' },
    { title: 'Audit issue escalated: Uncategorized Expense', description: 'High-priority review required for departmental budget line #201.', time: 'Oct 03, 2024', isError: true }
  ];

  getStatusClass(status: Status): string {
    return status.toLowerCase().replace(' ', '-');
  }
}
