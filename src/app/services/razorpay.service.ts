import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var Razorpay: any;

@Injectable({ providedIn: 'root' })
export class RazorpayService {
  constructor(private http: HttpClient) {}

  openPayment(amount: number) {
    // Call backend to create order
    this.http.post('http://localhost/api/verify-payment.php', { amount }).subscribe((order: any) => {
      const options = {
        key: 'rzp_live_ElBuC12GFI2sU2', // Razorpay Key ID (public only)
        amount: order.amount,
        currency: order.currency,
        name: 'Donation',
        description: 'Support for the cause',
        image: '/assets/images/logo.png',
        order_id: order.id, // OrderId from backend
        handler: (response: any) => {
          alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id);
          // Here you can call backend to verify payment
        },
        prefill: {
          name: '',
          email: '',
          contact: ''
        },
        theme: {
          color: '#d32f2f'
        }
      };

      const rzp = new Razorpay(options);
      rzp.open();
    });
  }
}
