import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminComponent } from '../admin/admin.component';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule, AdminComponent],
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent {
  admin = {
    name: 'Travel Admin',
    email: 'admin@travel.com',
    role: 'System Administrator',
    department: 'Administration',
    status: 'Active'
  };
}
