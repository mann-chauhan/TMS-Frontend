import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl =
    'http://localhost:8080/api/auth';

  constructor(
    private http: HttpClient,   private router: Router
  ) {}

  login(data: any) {

    return this.http.post(
      `${this.apiUrl}/login`,
      data
    );
  }

  saveUser(
    token: string,
    role: string,
    name: string
  ): void {

    localStorage.setItem(
      'token',
      token
    );

    localStorage.setItem(
      'role',
      role
    );

    localStorage.setItem(
      'name',
      name
    );
  }

  getToken(): string | null {

    return localStorage.getItem(
      'token'
    );
  }

  getRole(): string | null {

    return localStorage.getItem(
      'role'
    );
  }

  getName(): string | null {

    return localStorage.getItem(
      'name'
    );
  }

logout(): void {

  localStorage.removeItem('token');

  localStorage.removeItem('role');

  localStorage.removeItem('name');

  this.router.navigate(['/login']);
}
}