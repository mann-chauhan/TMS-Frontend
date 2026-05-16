import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {

  constructor(private router: Router) {}

  

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
