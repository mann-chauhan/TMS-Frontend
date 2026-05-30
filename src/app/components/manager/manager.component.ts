import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService }
from '../../services/auth.service';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [],
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent {

  constructor(private router: Router, private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }

  navigateToNewRequestManager() {
    this.router.navigate(['/new-request-manager']);
  }

  navigateToViewRequest() {
    this.router.navigate(['/view-requests']);
  }

  navigateToAnsweredRequest() {
    this.router.navigate(['/answered-requests']);
  }

  navigateToShowAccountabilities() {
    this.router.navigate(['/show-accountabilities']);
  }
  navigateToProfile() {
    this.router.navigate(['/manager-profile']);
  }

  navigateToManagerRequestHistory() {
    this.router.navigate(['/manager-request-history']);
  }

    navigateToManagerDashboard() {
    this.router.navigate(['/manager-dashboard']);
  }
}
