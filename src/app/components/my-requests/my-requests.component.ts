import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { EmployeeComponent } from '../employee/employee.component';

import { TravelRequestService } from '../../services/travel-request.service';

@Component({
  selector: 'app-my-requests',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    EmployeeComponent
  ],
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.scss']
})
export class MyRequestsComponent implements OnInit {

  searchText = '';

  filterStatus = '';

  page = 1;

  pageSize = 5;

  requests: any[] = [];

  selectedRequest: any | null = null;

  isLoading = false;

  errorMessage = '';

  constructor(
    private travelRequestService: TravelRequestService
  ) {}

  ngOnInit(): void {

    this.getEmployeeRequests();
  }

  // =========================
  // GET REQUESTS
  // =========================

  getEmployeeRequests() {

    this.isLoading = true;

    this.travelRequestService
      .getEmployeeRequests(2)
      .subscribe({

        next: (response: any) => {

          console.log(response);

          this.requests = response.data || [];

          this.isLoading = false;
        },

        error: (error) => {

          console.log(error);

          this.errorMessage =
            'Unable to load requests';

          this.isLoading = false;
        }
      });
  }

  // =========================
  // STATS
  // =========================

  get total(): number {

    return this.requests.length;
  }

  get pending(): number {

    return this.requests.filter(

      r =>
        r.status === 'DRAFT' ||
        r.status === 'PENDING_MANAGER'

    ).length;
  }

  get approved(): number {

    return this.requests.filter(

      r =>
        r.status === 'MANAGER_APPROVED' ||
        r.status === 'FINANCE_APPROVED' ||
        r.status === 'BOOKED' ||
        r.status === 'COMPLETED'

    ).length;
  }

  get rejected(): number {

    return this.requests.filter(

      r =>
        r.status === 'REJECTED' ||
        r.status === 'CANCELLED'

    ).length;
  }

  // =========================
  // FILTER REQUESTS
  // =========================

  filteredRequests() {

    return this.requests.filter(r => {
      const query = this.searchText.trim().toLowerCase();

      const search =

        !query ||

        r.requestCode
          ?.toLowerCase()
          .includes(query)

        ||

        r.destination
          ?.toLowerCase()
          .includes(query);

      const status =

        this.filterStatus

          ? r.status === this.filterStatus

          : true;

      return search && status;
    });
  }

  pagedRequests() {

    const start = (this.page - 1) * this.pageSize;

    return this.filteredRequests().slice(start, start + this.pageSize);
  }

  get totalPages(): number {

    return Math.max(1, Math.ceil(this.filteredRequests().length / this.pageSize));
  }

  goToPage(page: number) {

    this.page = Math.min(Math.max(page, 1), this.totalPages);
  }

  onFiltersChanged() {

    this.page = 1;
  }

  // =========================
  // ACTIONS
  // =========================

  view(r: any) {

    this.selectedRequest = r;
  }

  closeView() {

    this.selectedRequest = null;
  }

  formatStatus(status: string = ''): string {

    return status.replace(/_/g, ' ');
  }

  statusClass(status: string = ''): string {

    return status.toLowerCase().replace(/_/g, '-');
  }

  formatBudget(value: number | string): string {

    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(Number(value || 0));
  }

  edit(r: any) {

    console.log('EDIT REQUEST', r);
  }

  cancel(r: any) {

  const confirmCancel = confirm(
    'Are you sure you want to cancel this request?'
  );

  if(!confirmCancel){

    return;
  }

  this.travelRequestService
    .cancelRequest(r.id)
    .subscribe({

      next: (response: any) => {

        console.log(response);

        alert(
          'Request Cancelled Successfully'
        );

        // REFRESH LIST

        this.getEmployeeRequests();
      },

      error: (error) => {

        console.log(error);

        alert(error.error.message);
      }
    });
}

  resubmit(r: any) {

    console.log('RESUBMIT REQUEST', r);

    r.status = 'DRAFT';
  }
}
