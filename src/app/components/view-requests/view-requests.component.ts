import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { ManagerComponent } from '../manager/manager.component';

import { TravelRequestService }
from '../../services/travel-request.service';

@Component({
  selector: 'app-view-requests',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ManagerComponent
  ],
  templateUrl: './view-requests.component.html',
  styleUrls: ['./view-requests.component.scss']
})
export class ViewRequestsComponent
implements OnInit, OnDestroy {

  selectedRequest: any = null;

  paginatedRequests: any[] = [];

  allRequests: any[] = [];

  filteredRequests: any[] = [];

  searchTerm = '';

  totalRequests = 0;

  pendingCount = 0;

  projectedBudget = 0;

  currentPage = 1;

  itemsPerPage = 5;

  totalPages = 1;

  pageNumbers: number[] = [];

  paginationStart = 0;

  paginationEnd = 0;

  totalFilteredRequests = 0;

  private readonly timeoutIds: number[] = [];

  profileImage =
  'https://i.pravatar.cc/150?img=12';

  constructor(

    private router: Router,

    private travelRequestService:
    TravelRequestService

  ) {}

  ngOnInit(): void {

    this.getManagerRequests();
  }

  ngOnDestroy(): void {

    this.timeoutIds.forEach(timeoutId =>

      window.clearTimeout(timeoutId)

    );
  }

  // =====================================
  // GET REQUESTS
  // =====================================

  getManagerRequests(): void {

    this.travelRequestService
      .getManagerRequests(4)
      .subscribe({

        next: (response: any) => {

          console.log(response);

          this.allRequests = response.data;

          this.filteredRequests =
            this.allRequests;

          this.totalFilteredRequests =
            this.filteredRequests.length;

          this.totalRequests =
            this.allRequests.length;

          this.pendingCount =

            this.allRequests.filter(

              r => r.status === 'DRAFT'

            ).length;

          this.projectedBudget =

            this.allRequests.reduce(

              (total, request) =>

                total + (request.estimatedBudget || 0),

              0
            );

          this.calculatePagination();

          this.updatePaginatedRequests();
        },

        error: (error: any) => {

          console.log(error);
        }
      });
  }

  // =====================================
  // SEARCH
  // =====================================

  onSearch(): void {

    const search =
      this.searchTerm.toLowerCase();

    this.filteredRequests =

      this.allRequests.filter(r =>

        r.destination
          ?.toLowerCase()
          .includes(search)

        ||

        r.employeeName
          ?.toLowerCase()
          .includes(search)

        ||

        r.requestCode
          ?.toLowerCase()
          .includes(search)
      );

    this.totalFilteredRequests =
      this.filteredRequests.length;

    this.currentPage = 1;

    this.calculatePagination();

    this.updatePaginatedRequests();
  }

  // =====================================
  // PAGINATION
  // =====================================

  calculatePagination(): void {

    this.totalPages = Math.ceil(

      this.totalFilteredRequests /
      this.itemsPerPage
    );

    this.pageNumbers = Array.from(

      { length: this.totalPages },

      (_, i) => i + 1
    );

    this.paginationStart =

      (this.currentPage - 1)
      * this.itemsPerPage + 1;

    this.paginationEnd = Math.min(

      this.currentPage
      * this.itemsPerPage,

      this.totalFilteredRequests
    );
  }

  updatePaginatedRequests(): void {

    const startIndex =

      (this.currentPage - 1)
      * this.itemsPerPage;

    const endIndex =
      startIndex + this.itemsPerPage;

    this.paginatedRequests =

      this.filteredRequests.slice(
        startIndex,
        endIndex
      );
  }

  goToPage(page: number): void {

    this.currentPage = page;

    this.calculatePagination();

    this.updatePaginatedRequests();
  }

  previousPage(): void {

    if (this.currentPage > 1) {

      this.currentPage--;

      this.calculatePagination();

      this.updatePaginatedRequests();
    }
  }

  nextPage(): void {

    if (this.currentPage < this.totalPages) {

      this.currentPage++;

      this.calculatePagination();

      this.updatePaginatedRequests();
    }
  }

  // =====================================
  // HELPERS
  // =====================================

  getInitials(name: string): string {

    return name
      ?.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  }

  formatStatus(status: string): string {

    return status
      ?.replace('_', ' ')
      .toUpperCase();
  }

  // =====================================
  // MODAL
  // =====================================

  viewRequest(request: any): void {

    this.selectedRequest = request;
  }

  closeModal(): void {

    this.selectedRequest = null;
  }

  // =====================================
  // APPROVE
  // =====================================

  approveRequest(request: any): void {

    this.travelRequestService
      .approveRequest(request.id)
      .subscribe({

        next: () => {

          alert('Approved Successfully');

          this.closeModal();

          this.getManagerRequests();
        },

        error: (error: any) => {

          console.log(error);

          alert('Approval Failed');
        }
      });
  }

  // =====================================
  // REJECT
  // =====================================

  rejectRequest(request: any): void {

    this.travelRequestService
      .rejectRequest(request.id)
      .subscribe({

        next: () => {

          alert('Rejected Successfully');

          this.closeModal();

          this.getManagerRequests();
        },

        error: (error: any) => {

          console.log(error);

          alert('Rejection Failed');
        }
      });
  }

  toggleFilter(): void {

    console.log('filter');
  }

  toggleNotifications(): void {

    console.log('notifications');
  }

  exportCSV(): void {

    console.log('export');
  }
}