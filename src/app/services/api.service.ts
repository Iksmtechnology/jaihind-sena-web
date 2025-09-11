import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  postDataApi(type: any, data: any): Observable<any> {


    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const token = sessionStorage.getItem('authToken');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.post(this.baseUrl + type, data, { headers });
  }
  postpassDataApi(url: string, payload: any, httpOptions?: any): Observable<any> {
    return this.http.post(this.baseUrl + url, payload, httpOptions);
  }
  updateuserDataApi(type: any, data: any, id: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const token = sessionStorage.getItem('authToken');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.post(this.baseUrl + type, data, {
      headers,
      responseType: 'text' as 'json'  // 👈 Fix for non-JSON responses
    });
  }

  updateDataApi(type: any, data: any, id: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const token = sessionStorage.getItem('authToken');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.put(this.baseUrl + type + '/' + id, data, { headers });
  }

  updateRoleDataApi(type: any, data: any, id: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const token = sessionStorage.getItem('authToken');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.put(this.baseUrl + type + '/' + id, data, { headers });
  }
  deleteDataApi(type: any, data: any): Observable<any> {
    return this.http.delete(this.baseUrl + type + '/' + data);
  }
  deleteSpocDataApi(url: string, id: string): Observable<string> {
    const apiUrl = `${this.baseUrl}${url}/${id}`;
    return this.http.delete(apiUrl, { responseType: 'text' });
  }


  deleteRolePermissionDataApi(type: any, data: any): Observable<any> {
    return this.http.delete(this.baseUrl + type, { body: data });
  }

  deleteRolePermissionDataApi1(type: any, data: any, p0: { responseType: string; }): Observable<any> {
    return this.http.delete(this.baseUrl + type, {
      body: data,
      responseType: 'text' // Ensure response is treated as plain text
    });
  }
  postDataApipermission(type: string, data: any) {
    return this.http.post(this.baseUrl + type, data, { responseType: 'text' });
  }

  getDataApi(type: any): Observable<any> {
    const token = sessionStorage.getItem('authToken');

    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.get(this.baseUrl + type, { headers });
  }

  getDataApiWithParams(type: any, options: { params?: HttpParams } = {}): Observable<any> {
    return this.http.get(this.baseUrl + type, options);
  }

  uploadFile(type: any, data: any): Observable<any> {
    return this.http.post(this.baseUrl + type, data, { responseType: 'text' });
  }

  downloadFile(type: any) {
    return this.http.get(this.baseUrl + type, { responseType: 'blob' });
  }

  postDataApiforLocationTransfeering(type: string, data: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const token = sessionStorage.getItem('authToken');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.post(this.baseUrl + type, data, {
      headers,
      responseType: 'text'  // Tell HttpClient to expect text response
    }).pipe(
      map(response => {
        try {
          // Try to parse as JSON if possible
          return JSON.parse(response);
        } catch (e) {
          // Return plain text if not JSON
          return response;
        }
      })
    );
  }

  deletedataDataApi(url: string) {
    return this.http.delete(url, { responseType: 'text' }); // assuming you're using HttpClient from @angular/common/http
  }

}
