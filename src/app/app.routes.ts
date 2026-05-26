import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'employee',
    loadComponent: () => import('./components/employee-dashboard/employee-dashboard.component').then(m => m.employeeDashboardComponent)
  },
  {
    path: 'manager',
    loadComponent: () => import('./components/manager-dashboard/manager-dashboard.component').then(m => m.ManagerDashboardComponent)
  },
  {
    path: 'finance',
    loadComponent: () => import('./components/finance-dashboard/finance-dashboard.component').then(m => m.FinanceDashboardComponent)
  },
  {
    path: 'new-request',
    loadComponent: () => import('./components/new-request/new-request.component').then(m => m.NewRequestComponent)
  },
  {
    path: 'my-requests',
    loadComponent: () => import('./components/my-requests/my-requests.component').then(m => m.MyRequestsComponent)
  },
  {
    path: 'app-accountability',
    loadComponent: () => import('./components/responsibilities/responsibilities.component').then(m => m.ResponsibilitiesComponent)
  },
  {
    path: 'new-request-manager',
    loadComponent: () => import('./components/new-request-manager/new-request-manager.component').then(m => m.NewRequestManagerComponent)
  },
  {
    path: 'view-requests',
    loadComponent: () => import('./components/view-requests/view-requests.component').then(m => m.ViewRequestsComponent)
  },
  {
    path: 'answered-requests',
    loadComponent: () => import('./components/answered-requests/answered-requests.component').then(m => m.AnsweredRequestsComponent)
  },
  {
    path: 'show-accountabilities',
    loadComponent: () => import('./components/show-accountabilities/show-accountabilities.component').then(m => m.AccountabilitiesComponent)
  },
  {
    path: 'employee-profile',
    loadComponent: () => import('./components/employee-profile/employee-profile.component').then(m => m.EmployeeProfileComponent)
  },
  {
    path: 'manager-profile',
    loadComponent: () => import('./components/manager-profile/manager-profile.component').then(m => m.ManagerProfileComponent)
  },
  {
    path: 'employee-dashboard',
    loadComponent: () => import('./components/employee-dashboard/employee-dashboard.component').then(m => m.employeeDashboardComponent)
  },
  {
    path: 'manager-dashboard',
    loadComponent: () => import('./components/manager-dashboard/manager-dashboard.component').then(m => m.ManagerDashboardComponent)
  },
  {
    path: 'finance-profile',
    loadComponent: () => import('./components/finance-profile/finance-profile.component').then(m => m.FinanceProfileComponent)
  },
  {
    path: 'finance-dashboard',
    loadComponent: () => import('./components/finance-dashboard/finance-dashboard.component').then(m => m.FinanceDashboardComponent)
  },
  {
    path: 'finance-show-requests',
    loadComponent: () => import('./components/finance-show-request/finance-show-request.component').then(m => m.FinanceApprovalCenterComponent)
  },
  {
    path: 'finance-show-accountabilities',
    loadComponent: () => import('./components/finance-show-accountabilities/finance-show-accountabilities.component').then(m => m.FinanceShowAccountabilitiesComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./components/admin-add-user/admin-add-user.component').then(m => m.AddUserComponent)
  },
  {
    path: 'admin-add-user/:id',
    loadComponent: () => import('./components/admin-add-user/admin-add-user.component').then(m => m.AddUserComponent)
  },
  {
    path: 'admin-add-user',
    loadComponent: () => import('./components/admin-add-user/admin-add-user.component').then(m => m.AddUserComponent)
  },
  {
    path: 'admin-all-users',
    loadComponent: () => import('./components/admin-all-users/admin-all-users.component').then(m => m.AdminAllUsersComponent)
  },
  {
    path: 'admin-profile',
    loadComponent: () => import('./components/admin-profile/admin-profile.component').then(m => m.AdminProfileComponent)
  },
    {
    path: 'finance-decision-history',
    loadComponent: () => import('./components/finance-decision-history/finance-decision-history.component').then(m => m.FinanceDecisionHistoryComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./components/login-two/login-two.component').then(m => m.LoginComponentTwo)
  }
];
