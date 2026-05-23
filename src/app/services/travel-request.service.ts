import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TravelRequestService {

  private apiUrl = 'http://localhost:8080/api/requests';

  constructor(private http: HttpClient) {}

    cancelRequest(id: number) {

  return this.http.put(

    `${this.apiUrl}/cancel/${id}`,

    {}

  );
}

  getEmployeeRequests(employeeId: number) {

  return this.http.get(

    `${this.apiUrl}/employee/${employeeId}`
  );
}

  createRequest(payload: any): Observable<any> {

    return this.http.post(this.apiUrl, payload);
  }

  getManagerRequests(managerId: number) {

  return this.http.get(

    `${this.apiUrl}/manager/${managerId}`

  );
}

approveRequest(id: number) {

  return this.http.put(

    `${this.apiUrl}/approve/${id}`,

    {}

  );
}

rejectRequest(id: number) {

  return this.http.put(

    `${this.apiUrl}/reject/${id}`,

    {}

  );
}

}