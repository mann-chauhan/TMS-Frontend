import { Routes } from '@angular/router';
// import { RegisterComponent } from './components/register/register.component';
// import { LoginComponent } from './components/login/login.component';
import { FinanceComponent } from './components/finance/finance.component';
import { ManagerComponent } from './components/manager/manager.component';
import { NewRequestComponent } from './components/new-request/new-request.component';
import { MyRequestsComponent } from './components/my-requests/my-requests.component';
import { ResponsibilitiesComponent} from './components/responsibilities/responsibilities.component';
import { LoginComponentTwo } from './components/login-two/login-two.component';
import { NewRequestManagerComponent } from './components/new-request-manager/new-request-manager.component';
import { ViewRequestsComponent } from './components/view-requests/view-requests.component';
import { AnsweredRequestsComponent } from './components/answered-requests/answered-requests.component';
import { AccountabilitiesComponent } from './components/show-accountabilities/show-accountabilities.component';

import { employeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { EmployeeProfileComponent } from './components/employee-profile/employee-profile.component';
import { ManagerDashboardComponent } from './components/manager-dashboard/manager-dashboard.component';
import { ManagerProfileComponent } from './components/manager-profile/manager-profile.component';
import { FinanceProfileComponent } from './components/finance-profile/finance-profile.component';
import { FinanceDashboardComponent } from './components/finance-dashboard/finance-dashboard.component';
import { FinanceApprovalCenterComponent } from './components/finance-show-request/finance-show-request.component';
import { FinanceAcknowledgedComponent } from './components/finance-acknowledged/finance-acknowledged.component';
import { FinanceShowAccountabilitiesComponent } from './components/finance-show-accountabilities/finance-show-accountabilities.component';
import { AddUserComponent } from './components/admin-add-user/admin-add-user.component';
import { AdminAllUsersComponent } from './components/admin-all-users/admin-all-users.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';







export const routes: Routes = [
    // {
    //     path: 'register',
    //     component: RegisterComponent
    // },
    // {
    //     path: '',
    //     component: LoginComponent
    // },
    {
        path: 'employee',
        component: employeeDashboardComponent
    },
    {
        path: 'manager',
        component: ManagerDashboardComponent
    },
    {
        path: 'finance',
        component: FinanceComponent
    },
    {
        path: 'new-request',
        component: NewRequestComponent
    },
    {
        path: 'my-requests',
        component: MyRequestsComponent
    },
    {
        path: 'app-accountability',
        component: ResponsibilitiesComponent
    },
    {
        path: 'new-request-manager',
        component: NewRequestManagerComponent 
    },
    {
        path: 'view-requests',
        component: ViewRequestsComponent
    },
    
  {
    path: 'answered-requests',
    component: AnsweredRequestsComponent
  },
  {
    path: 'show-accountabilities',
    component: AccountabilitiesComponent
  },
  
    {
    path: 'employee-profile',
    component: EmployeeProfileComponent
  },
  {
    path: 'manager-profile',
    component: ManagerProfileComponent
  },
  {
    path: 'employee-dashboard',
    component: employeeDashboardComponent
  },
  {
    path: 'manager-dashboard',
    component: ManagerDashboardComponent
  },
  {
    path: 'employee-profile',
    component: EmployeeProfileComponent
  },
  // {
  //   path: 'manager-profile',
  //   component: ManagerProfileComponent
  // },
  // {
  //   path: 'finance-profile',
  //   component: FinanceProfileComponent
  // },
  {
    path: 'finance-profile',
    component: FinanceProfileComponent
  },
  {
    path: 'finance-dashboard',
    component: FinanceDashboardComponent
  },
  {
    path: 'finance-show-requests',
    component: FinanceApprovalCenterComponent
  },
  {
    path: 'finance-acknowledged',
    component: FinanceAcknowledgedComponent
  },
  {
    path: 'finance-show-accountabilities',
    component: FinanceShowAccountabilitiesComponent
  },
  {
    path: 'admin',
    component: AddUserComponent
  },
  {
    path: 'admin-add-user',
    component: AddUserComponent
  },
  {
    path: 'admin-all-users',
    component: AdminAllUsersComponent
  },
  {
    path: 'admin-profile',
    component: AdminProfileComponent
  },
 

  {
    path: '**',
    component: LoginComponentTwo
} ,
 

];
