import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/Environment/environment';
import { User, UserResponse } from 'src/app/Interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

   baseUrl=`${environment.APIURL}`;

  constructor(private http: HttpClient) { }

  getUsers(pageNumber:any, pageSize:any): Observable<UserResponse> {
    const url = `${this.baseUrl}User/GetAllUsers?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http.get<UserResponse>(url);
  }

  getUserById(id: number): Observable<User> {
    const url = `${this.baseUrl}User/GetUserById?id=${id}`;
    return this.http.get<User>(url);
  }

  createUser(user: User): Observable<User> {
    const url = `${this.baseUrl}User/CreateUser`;
    return this.http.post<User>(url, user);
  }

  updateUser(id: number, user: User): Observable<void> {
    const url = `${this.baseUrl}User/UpdateUser?id=${id}`;
    return this.http.put<void>(url, user);
  }

  deleteUser(id: number): Observable<void> {
    const url = `${this.baseUrl}User/DeleteUser?id=${id}`;
    return this.http.delete<void>(url);
  }

}
