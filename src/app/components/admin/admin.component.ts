import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService }
from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  constructor(private router: Router, private authService: AuthService) {}


logout(): void {

  this.authService.logout();
}

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
