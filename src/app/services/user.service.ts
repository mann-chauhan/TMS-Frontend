import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  addUser(data: any) {
    return this.http.post(this.apiUrl, data);
  }
  getManagerByDepartment(department: string) {

  return this.http.get(
    `${this.apiUrl}/manager/${department}`
  );
}

    getAllUsers() {
        
  return this.http.get<any[]>(this.apiUrl);
     }

    getUserById(id: number){

    return this.http.get(
        `${this.apiUrl}/${id}`
    );
    }

    updateUser(id: number, data: any){

  return this.http.put(
    `${this.apiUrl}/${id}`,
    data
        );
    }

    deleteUser(id: number){

     return this.http.delete(
    `${this.apiUrl}/${id}`
        );
    }
}