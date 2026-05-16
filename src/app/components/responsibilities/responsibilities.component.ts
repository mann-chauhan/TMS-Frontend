import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmployeeComponent } from '../employee/employee.component';
 
export interface ExpenseReport {
  id: string;
  destination: string;
  type: string;
  image: string;
  dates: string;
  budget: number;
  actual: number | null;
  status: 'Approved' | 'Pending' | 'Submitted' | 'Rejected';
}
 
@Component({
  selector: 'app-responsibilities',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, CurrencyPipe, EmployeeComponent],
  templateUrl: './responsibilities.component.html',
  styleUrls: ['./responsibilities.component.scss']
})
export class ResponsibilitiesComponent implements OnInit {
 
  // ─── Search / Filter State ───────────────────────────────────────────────
  searchQuery = '';
  selectedStatus = '';
 
  // ─── Pagination ──────────────────────────────────────────────────────────
  currentPage = 1;
  itemsPerPage = 5;
  totalEntries = 124;
 
  // ─── Raw Data ────────────────────────────────────────────────────────────
  readonly reports: ExpenseReport[] = [
    {
      id: '#TRV-8821',
      destination: 'Sydney, Australia',
      type: 'Tech Conference',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQqKTzcIsLAs-cxJislOl2l-PGlQidKOlGwjnbWza6Iv-YLcW_VJ3FZrdlfKmv1YCIOk6v1BzjxVZb_D2ptHTw31nW1Vb_9NArDBMioy22KFeezZKiXDh_e8RsdvUaZqINgWqGRI1AcSQuHWybi1BGak8yF5hdocHGEiA2n8F7wLk9W36HLPKuuzqQeJtd5rGHz2dST49PRpXWFmb4eQ5TGQNsvjuTHoPkHpb10mey7x24wxTQauAWJ-vhYcCa4ek3eRmZ_K6h35xp',
      dates: 'Oct 12 - Oct 18, 2023',
      budget: 4500,
      actual: 4250.40,
      status: 'Approved'
    },
    {
      id: '#TRV-9012',
      destination: 'London, UK',
      type: 'Board Meeting',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA79lKtsQaZGMhhKrOuz7gInMrI7fNlLS89PlpG-iA6Hdtw3ctaA_blLzD0Vpgz3-uqZD-nYXJO3K1Ihpr8YQFZJgX4nrh3_xHL1G9oh7O0fI7szo-gOLMtCSz5f1tmXhcOxFBk9U3M_FLg3KISUhq2MAhlXhyPJfje0RLBLbHwpfe9aXd4mUi2CtdwIAOTPC9Z9oFXbHSIg9BNUip5ZuKtToSiGCzxEJOp0SkFjnU2QJEH0WKikawp2PHMXD8dCoXlaQMYKEwJi0QY',
      dates: 'Nov 02 - Nov 05, 2023',
      budget: 2200,
      actual: null,
      status: 'Pending'
    },
    {
      id: '#TRV-8945',
      destination: 'Moscow, Russia',
      type: 'Client Negotiation',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIq2_4m_ZC-TXELB7ChrWX48TLJaQX-ECeW3S0ivua-FUJCFgRUoeT0r6U5OBRbW6RxkmxY7nPMR251_WG9LgVcMkhFkOTZ1ZuvZMeJsTly32FpOG-Nm3V0cuuO1uMli4Yo1A8_KAZ_Fmn0ChlYgktmKDttl9ND2qaN15tNrktwWqm3hNZZE8_CcUkGPo6s55e0WxhGPE_F1Tvolj5Lk8Wo5gDXJZkcZo9yAmXt5V1zD8o_inqhlkFCJ9xEJomroHU41-g7eck6HAE',
      dates: 'Oct 25 - Oct 30, 2023',
      budget: 3800,
      actual: 3920.15,
      status: 'Submitted'
    },
    {
      id: '#TRV-8756',
      destination: 'New York, USA',
      type: 'Marketing Launch',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRC65G3Hki7nULe_bB2yO8dj-kPS0aLa_IcDfmBRh_2LXFbZtYtaLj65jSDQhbIRPDl3tE_5y9zORZ_dZWQVGMYh_wv416_KG6j8ucTf1_EjAdjz9gsOLOPp8_MI0MHvemZ5Mh1TVcqvy1aPs1VLX6y_u8j9nAx6x1ID9SbdwLM870hRRzCDM_ND1BJjqus4wxkaZmF3Wo4YlhocVTFCDw463aWdEY1Rj5nxUw4iUTAmpqhHo0Rhk_trVIqnEdjOMkqDbcAIPgD7sg',
      dates: 'Sep 15 - Sep 20, 2023',
      budget: 5000,
      actual: 5450,
      status: 'Rejected'
    },
    {
      id: '#TRV-8612',
      destination: 'Kyoto, Japan',
      type: 'Design Summit',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjhk5Yphdqffn7pzKqGgw3Oecjon257kk_IRUe8eLXpU4tlf8l9l-J3WJ8YsFshOvnokeHBTJ-3_eROHBer8tV2417lLtp5NkdKfNl2Rr6mIC3GnUUq6WiTCmQWCXoJVjhPVdO57VtnTorZDcM6ww2Aa6q5IUIXyjE8xCVu6rWyRQRV0Fb5-WfmljHGQvSHhwJiULJW8zMfkVxxNmy4DYIosTYgcLh-_NRzLdSlGVQERz-_LlR5yVGE6zW1QJam6R6JO9cEHkIS9CG',
      dates: 'Sep 01 - Sep 08, 2023',
      budget: 3200,
      actual: 3180,
      status: 'Approved'
    }
  ];
 
  // ─── Derived / Computed ──────────────────────────────────────────────────
  get filteredReports(): ExpenseReport[] {
    return this.reports.filter(r => {
      const matchesStatus = !this.selectedStatus ||
        r.status.toLowerCase() === this.selectedStatus.toLowerCase();
      const matchesSearch = !this.searchQuery ||
        r.destination.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        r.id.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        r.type.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }
 
  get totalPages(): number {
    return Math.ceil(this.totalEntries / this.itemsPerPage);
  }
 
  get pages(): number[] {
    return Array.from({ length: Math.min(this.totalPages, 3) }, (_, i) => i + 1);
  }
 
  get paginationInfo(): string {
    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end = Math.min(this.currentPage * this.itemsPerPage, this.totalEntries);
    return `${start}-${end} of ${this.totalEntries} entries`;
  }
 
  // ─── Lifecycle ────────────────────────────────────────────────────────────
  ngOnInit(): void {
    // Initialize component — connect to real API here in production
  }
 
  // ─── Methods ─────────────────────────────────────────────────────────────
 
  /** Returns a CSS class string based on actual vs. budget spend. */
  getActualClass(report: ExpenseReport): string {
    if (report.actual === null) return 'text-gray';
    if (report.actual <= report.budget) return 'text-green';
    return 'text-red';
  }
 
  /** Returns the label for the action button based on report status. */
  getActionLabel(status: ExpenseReport['status']): string {
    switch (status) {
      case 'Approved':  return 'View only';
      case 'Pending':   return 'Submit';
      case 'Submitted': return 'View';
      case 'Rejected':  return 'Edit / Resubmit';
      default:          return 'View';
    }
  }
 
  /** Handles action button click based on report status. */
  onAction(report: ExpenseReport): void {
    switch (report.status) {
      case 'Pending':
        this.submitReport(report);
        break;
      case 'Rejected':
        this.editReport(report);
        break;
      default:
        this.viewReport(report);
    }
  }
 
  viewReport(report: ExpenseReport): void {
    console.log('Viewing report:', report.id);
    // Navigate to detail view: this.router.navigate(['/accountability', report.id]);
  }
 
  submitReport(report: ExpenseReport): void {
    console.log('Submitting report:', report.id);
    // Open submission modal / navigate to form
  }
 
  editReport(report: ExpenseReport): void {
    console.log('Editing report:', report.id);
    // Navigate to edit form: this.router.navigate(['/accountability', report.id, 'edit']);
  }
 
  onFilterChange(): void {
    this.currentPage = 1;
  }
 
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
 
  openSubmitModal(): void {
    console.log('Open submit accountability modal');
    // Open dialog: this.dialog.open(SubmitAccountabilityDialogComponent);
  }
 
  downloadReport(): void {
    console.log('Downloading expense report...');
    // Trigger file download via service
  }
}