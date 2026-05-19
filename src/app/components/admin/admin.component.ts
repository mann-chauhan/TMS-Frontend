import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  constructor(private router: Router) {}

  navigateToAddUser() {
    this.router.navigate(['/admin-add-user']);
  }

  navigateToAllUsers() {
    this.router.navigate(['/admin-all-users']);
  }

  navigateToProfile() {
    this.router.navigate(['/admin-profile']);
  }

  navigateToLogout(){
    this.router.navigate(['']);
  }
}
