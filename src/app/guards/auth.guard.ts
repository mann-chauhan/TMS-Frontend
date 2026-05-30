import { inject } from '@angular/core';

import {
  CanActivateFn,
  Router
} from '@angular/router';

export const authGuard: CanActivateFn =
(route, state) => {

  const router = inject(Router);

  const token =
    localStorage.getItem('token');

  const role =
    localStorage.getItem('role');

  // =====================
  // NOT LOGGED IN
  // =====================

  if (!token) {

    router.navigate(['/login']);

    return false;
  }

  // =====================
  // ROLE CHECK
  // =====================

  const expectedRole =
    route.data?.['role'];

  if (
    expectedRole &&
    role !== expectedRole
  ) {

    switch (role) {

      case 'EMPLOYEE':
        router.navigate(['/employee']);
        break;

      case 'MANAGER':
        router.navigate(['/manager']);
        break;

      case 'FINANCE':
        router.navigate(['/finance']);
        break;

      case 'ADMIN':
        router.navigate(['/admin']);
        break;

      default:
        router.navigate(['/login']);
    }

    return false;
  }

  return true;
};