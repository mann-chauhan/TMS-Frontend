import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from '../admin/admin.component';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';



interface AdminUser {

  id: number;

  employeeCode: string;

  fullName: string;

  email: string;

  department: string;

  role: string;

  isActive: boolean;
}

@Component({
  selector: 'app-admin-all-users',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminComponent],
  templateUrl: './admin-all-users.component.html',
  styleUrls: ['./admin-all-users.component.scss']
})
export class AdminAllUsersComponent implements OnInit {
  searchQuery = '';

constructor(
  private userService: UserService,
  private router: Router
) {}

  ngOnInit(): void {

  this.getAllUsers();

}
  editUser(user: AdminUser) {

  this.router.navigate([
  '/admin-add-user',
  user.id
]);
}

  deleteUser(id: number) {

  const confirmDelete = confirm(
  'Are you sure you want to delete this user?'
);

if(!confirmDelete){
  return;
}

this.userService.deleteUser(id)
  .subscribe({

    next: () => {

      alert('User Deleted Successfully');

      this.getAllUsers();
    },

    error: (error) => {

      console.log(error);

      alert('Delete Failed');
    }
  });
}

  getAllUsers() {

  this.userService.getAllUsers()
    .subscribe({

      next: (response) => {

        console.log(response);

        this.users = response;
      },

      error: (error) => {

        console.log(error);
      }
    });
}

  users: AdminUser[] = [
  //   // {
  //   //   name: 'Aarav Mehta',
  //   //   email: 'aarav.mehta@travel.com',
  //   //   department: 'Operations',
  //   //   role: 'Employee',
  //   //   status: 'Active'
  //   // },
  //   {
  //     name: 'Mira Kapoor',
  //     email: 'mira.kapoor@travel.com',
  //     department: 'Finance',
  //     role: 'Finance',
  //     status: 'Active'
  //   },
  //   {
  //     name: 'Rohan Shah',
  //     email: 'rohan.shah@travel.com',
  //     department: 'Technology',
  //     role: 'Manager',
  //     status: 'Inactive'
  //   }
  ];

  get filteredUsers(): AdminUser[] {
    const query = this.searchQuery.trim().toLowerCase();

    if (!query) {
      return this.users;
    }

    return this.users.filter(user =>
      [
  user.fullName,
  user.email,
  user.department,
  user.role,
  user.isActive ? 'Active' : 'Inactive'
]
        .some(value => value.toLowerCase().includes(query))
    );
  }
}
