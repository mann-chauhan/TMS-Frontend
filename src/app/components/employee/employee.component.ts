import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService }
from '../../services/auth.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {

  constructor(private router: Router, private authService: AuthService) {}

logout(): void {

  this.authService.logout();
}  

  navigateToNewRequest() {
    this.router.navigate(['/new-request']);
  }
  navigateToMyRequests() {
    this.router.navigate(['/my-requests']);
  }
  navigateToAccountabilities(){
    this.router.navigate(['/app-accountability']);
  }
  navigateToLogout(){
    this.router.navigate(['']);
  }
  navigateToEmployeeProfile(){
    this.router.navigate(['/employee-profile']);
  }
  navigateToEmployeeDashboard(){
    this.router.navigate(['/employee-dashboard']);
  }
  
}
