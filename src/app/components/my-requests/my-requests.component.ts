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

  requests: any[] = [];

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

      const search =

        r.requestCode
          ?.toLowerCase()
          .includes(this.searchText.toLowerCase())

        ||

        r.destination
          ?.toLowerCase()
          .includes(this.searchText.toLowerCase());

      const status =

        this.filterStatus

          ? r.status === this.filterStatus

          : true;

      return search && status;
    });
  }

  // =========================
  // ACTIONS
  // =========================

  view(r: any) {

    console.log('VIEW REQUEST', r);
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