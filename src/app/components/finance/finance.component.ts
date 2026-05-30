import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService }
from '../../services/auth.service';

@Component({
  selector: 'app-finance',
  standalone: true,
  imports: [],
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})
export class FinanceComponent {

  constructor(private router: Router,  private authService: AuthService) {}

logout(): void {

  this.authService.logout();
}

  navigateToFinanceDashboard() {
    this.router.navigate(['/finance-dashboard']);
  }

  navigateToShowRequests() {
    this.router.navigate(['/finance-show-requests']);
  }

   navigateToDecisionHistory() {
    this.router.navigate(['/finance-decision-history']);
  }

  navigateToShowAccountabilities() {
    this.router.navigate(['/finance-show-accountabilities']);
  }

  navigateToProfile() {
    this.router.navigate(['/finance-profile']);
  }

}
