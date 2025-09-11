// src/app/services/supabase-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SupabaseApiService {
  // private baseUrl = 'https://ztptsboahsmftfvjejhj.supabase.co/rest/v1/'; // Table name is 'user'
  // private apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0cHRzYm9haHNtZnRmdmplamhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyODM4NjAsImV4cCI6MjA2OTg1OTg2MH0.cVyx85qFrusdPa28WAcid0iKAOmCDNeghYC5etLF84Q'; // Replace with your Supabase anon key

  baseUrl: string = environment.apiBaseUrl;

  private headers = new HttpHeaders({
    // 'apikey': this.apiKey,
    // 'Authorization': `Bearer ${this.apiKey}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  });
  supabase: any;

  constructor(private http: HttpClient) { }

  // GET all users
  getUsers(): Observable<any> {
    return this.http.get(this.baseUrl, { headers: this.headers });
  }

  postDataApi(type: any, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}${type}`, data, { headers: this.headers });
  }

  getDataApi(type: any): Observable<any> {
    return this.http.get(this.baseUrl + type);
  }

  deleteDataApi(type: any, id: number): Observable<any> {
    return this.http.delete(this.baseUrl + type + '/' + id);
  }

  // ✅ Get by ID
  getDataByIdApi(type: string, id: number): Observable<any> {
    return this.http.get(this.baseUrl + type + '/' + id);
  }


  // login cred check
  getLoginDataApi(type: string, username: string, password: string): Observable<any> {
    // Here we are building a query filter
    const url = `${this.baseUrl}${type}?username=eq.${username}&password=eq.${password}`;
    return this.http.get(url, { headers: this.headers });
  }



  // POST a new user
  addUser(user: any): Observable<any> {
    return this.http.post(this.baseUrl, user, { headers: this.headers });
  }

  // DELETE a user by ID
  deleteUser(id: string): Observable<any> {
    const url = `${this.baseUrl}?id=eq.${id}`;
    return this.http.delete(url, { headers: this.headers });
  }

  // Upload image to Supabase Storage
  async uploadImage(file: File): Promise<string> {
    const filePath = `gallery/${Date.now()}-${file.name}`;

    const { error } = await this.supabase.storage
      .from('gallery-bucket')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    const { data: publicUrlData } = this.supabase.storage
      .from('gallery-bucket')
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  }

  // POST a new user

  postLeaderData(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/postLeader`, data);
  }

  getData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/postLeader`);
  }

  uploadImageAndSave(formData: any, file: File): Observable<any> {
    return new Observable(observer => {
      (async () => {
        try {
          const filePath = `gallery/${Date.now()}-${file.name}`;
          const { data, error } = await this.supabase
            .storage
            .from('gallery-bucket')
            .upload(filePath, file, { cacheControl: '3600', upsert: false });

          if (error) throw error;

          const { data: publicUrlData } = this.supabase
            .storage
            .from('gallery-bucket')
            .getPublicUrl(filePath);

          const publicUrl = publicUrlData.publicUrl;

          const payload = { ...formData, image_url: publicUrl };

          this.http.post(this.baseUrl, payload, { headers: this.headers })
            .subscribe({
              next: (res) => {
                observer.next(res);
                observer.complete();
              },
              error: (err) => observer.error(err)
            });
        } catch (err) {
          observer.error(err);
        }
      })();
    });
  }


  postpassDataApi(url: string, payload: any,): Observable<any> {
    return this.http.post(this.baseUrl + url, payload);
  }

}
