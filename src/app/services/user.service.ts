import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost/api'; // your PHP folder URL

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/fetch-users.php`);
  }

  getDataApi(type: any): Observable<any> {
    return this.http.get(this.apiUrl + type,);
  }
  //   getUsers(): Observable<any> {
  //   return this.http.get("http://localhost/api/fetch-users.php");
  // }

  addUser(user: { name: string; email: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-user.php`, user);
  }

  postpassDataApi(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/sendmail.php`, payload);
  }

  postLeaderApi(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/post-leader.php`, payload);
  }


  // deleteDataApi(url: string, id: any): Observable<string> {
  //   const apiUrl = `${this.apiUrl}${url}/${id}`;
  //   return this.http.delete(apiUrl, { responseType: 'text' });
  // }
  deleteDataApi(url: string, id: any): Observable<any> {
    const apiUrl = `${this.apiUrl}${url}?id=${id}`;
    return this.http.delete(apiUrl);
  }

  postDataApi(url: string, payload: any): Observable<any> {
    return this.http.post(this.apiUrl + url, payload);
  }

  // update-leader.php

  updateDataApi(type: any, data: any, id: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${type}?id=${id}`, data);
  }


}
