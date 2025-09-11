import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  constructor(private http: HttpClient) {}

  createOrder(amount: number) {
    return this.http.post<any>('http://localhost/api/create_order.php', { amount });
  }
}
