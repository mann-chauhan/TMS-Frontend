import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finance',
  standalone: true,
  imports: [],
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})
export class FinanceComponent {

  constructor(private router: Router) {}

  navigateToLogout(){
    this.router.navigate(['']);
  }

  navigateToFinanceDashboard() {
    this.router.navigate(['/finance-dashboard']);
  }

  navigateToShowRequests() {
    this.router.navigate(['/finance-show-requests']);
  }

  navigateToAcknowledged() {
    this.router.navigate(['/finance-acknowledged']);
  }

  navigateToShowAccountabilities() {
    this.router.navigate(['/finance-show-accountabilities']);
  }

  navigateToProfile() {
    this.router.navigate(['/finance-profile']);
  }

}
