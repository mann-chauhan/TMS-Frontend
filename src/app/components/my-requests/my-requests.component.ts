import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from '../employee/employee.component';

@Component({
  selector: 'app-my-requests',
  standalone: true,
  imports: [FormsModule, CommonModule, EmployeeComponent],
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.scss']
})
export class MyRequestsComponent {

  searchText = '';
  filterStatus = '';

  requests = [
    {
      id: 'TRV-88219',
      destination: 'Paris, France',
      purpose: 'Business Summit',
      start: 'Oct 12',
      end: 'Oct 18',
      budget: '$4250',
      status: 'Pending'
    },
    {
      id: 'TRV-88104',
      destination: 'Tokyo, Japan',
      purpose: 'Product Launch',
      start: 'Nov 02',
      end: 'Nov 09',
      budget: '$6800',
      status: 'Approved'
    },
    {
      id: 'TRV-87992',
      destination: 'New York, USA',
      purpose: 'Tech Conference',
      start: 'Sep 20',
      end: 'Sep 24',
      budget: '$3100',
      status: 'Rejected'
    }
  ];

  get total() { return this.requests.length; }
  get pending() { return this.requests.filter(r => r.status === 'Pending').length; }
  get approved() { return this.requests.filter(r => r.status === 'Approved').length; }
  get rejected() { return this.requests.filter(r => r.status === 'Rejected').length; }

  filteredRequests() {
    return this.requests.filter(r => {
      const search =
        r.id.toLowerCase().includes(this.searchText.toLowerCase()) ||
        r.destination.toLowerCase().includes(this.searchText.toLowerCase());

      const status =
        this.filterStatus ? r.status === this.filterStatus : true;

      return search && status;
    });
  }

  view(r: any) { console.log('View', r); }
  edit(r: any) { console.log('Edit', r); }
  cancel(r: any) { r.status = 'Cancelled'; }
  resubmit(r: any) { r.status = 'Pending'; }
}
