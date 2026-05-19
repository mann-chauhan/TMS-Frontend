import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from '../admin/admin.component';

interface AdminUser {
  name: string;
  email: string;
  department: string;
  role: string;
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-admin-all-users',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminComponent],
  templateUrl: './admin-all-users.component.html',
  styleUrls: ['./admin-all-users.component.scss']
})
export class AdminAllUsersComponent {
  searchQuery = '';

  users: AdminUser[] = [
    {
      name: 'Aarav Mehta',
      email: 'aarav.mehta@travel.com',
      department: 'Operations',
      role: 'Employee',
      status: 'Active'
    },
    {
      name: 'Mira Kapoor',
      email: 'mira.kapoor@travel.com',
      department: 'Finance',
      role: 'Finance',
      status: 'Active'
    },
    {
      name: 'Rohan Shah',
      email: 'rohan.shah@travel.com',
      department: 'Technology',
      role: 'Manager',
      status: 'Inactive'
    }
  ];

  get filteredUsers(): AdminUser[] {
    const query = this.searchQuery.trim().toLowerCase();

    if (!query) {
      return this.users;
    }

    return this.users.filter(user =>
      [user.name, user.email, user.department, user.role, user.status]
        .some(value => value.toLowerCase().includes(query))
    );
  }
}
