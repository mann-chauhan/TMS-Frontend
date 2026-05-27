import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TravelRequestService {

  // =========================================
  // BASE URL
  // =========================================

  private baseUrl =
    'http://localhost:8080/api/requests';

  constructor(
    private http: HttpClient
  ) {}

  // =========================================
  // EMPLOYEE
  // =========================================

  createRequest(data: any) {

    return this.http.post(
      `${this.baseUrl}`,
      data
    );
  }

  createManagerRequest(data: any) {

  return this.http.post(

    `${this.baseUrl}/manager/create`,

    data
  );
}

getManagerRequestHistory(
  managerId: number
) {

  return this.http.get(
    `${this.baseUrl}/manager/history/${managerId}`
  );
}

  getEmployeeRequests(employeeId: number) {

    return this.http.get(
      `${this.baseUrl}/employee/${employeeId}`
    );
  }

  cancelRequest(id: number) {

    return this.http.put(
      `${this.baseUrl}/cancel/${id}`,
      {}
    );
  }

  // =========================================
  // MANAGER
  // =========================================

  getManagerRequests(managerId: number) {

    return this.http.get(
      `${this.baseUrl}/manager/${managerId}`
    );
  }

  approveRequest(id: number) {

    return this.http.put(
      `${this.baseUrl}/approve/${id}`,
      {}
    );
  }

  rejectRequest(id: number) {

    return this.http.put(
      `${this.baseUrl}/reject/${id}`,
      {}
    );
  }

  // =========================================
  // FINANCE
  // =========================================

  getFinanceRequests() {

    return this.http.get(
      `${this.baseUrl}/finance`
    );
  }

financeApproveRequest(
  id: number,
  remarks: string
) {

  return this.http.put(
    `${this.baseUrl}/finance/approve/${id}`,
    {
      remarks: remarks
    }
  );
}

financeRejectRequest(
  id: number,
  remarks: string
) {

  return this.http.put(
    `${this.baseUrl}/finance/reject/${id}`,
    {
      remarks: remarks
    }
  );
}

  getFinanceDecisionHistory() {

  return this.http.get(
    `${this.baseUrl}/finance/history`
  );
}



}