import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PaymentService } from '../../../services/payment.service';
import { Cashfree, CheckoutResult, load } from '@cashfreepayments/cashfree-js';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-donation',
  imports: [CommonModule, RouterModule,
    ReactiveFormsModule,
    FormsModule],
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.scss'
})
export class DonationComponent {

  donationForm!: FormGroup;
  amounts = [1000, 2000, 5000, 10000, 20000];
  selectedAmount: number | null = null;
  cashfree: any;
  selectedLang: 'en' | 'mr' = 'en';

  constructor(private fb: FormBuilder, private paymentService: PaymentService, private router: Router, private route: ActivatedRoute, private http: HttpClient) {
  }


  ngOnInit() {

    this.cashfree = load({ mode: 'sandbox' });
    this.donationForm = this.fb.group({
      fullName: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', Validators.required],
      pan: [''],
      pincode: [''],
      referrerPhone: [''],
      confirmAge: [false, Validators.requiredTrue],
      amount: ['', Validators.required],
    });

    const storedLang = localStorage.getItem('lang') as 'en' | 'mr';
    if (storedLang) {
      this.selectedLang = storedLang;
    }

  }

  onSubmit() {
    if (this.donationForm.invalid) {
      alert("Please fill all required fields correctly.");
      return;
    }

    // Extract values from form
    const formValues = this.donationForm.value;
    // Call PHP backend with form data
    this.http.post<any>('http://localhost/api/create_order.php', {
      amount: formValues.amount,
      name: formValues.fullName,
      email: formValues.email,   // 👉 Replace with actual email if you add it in form
      phone: formValues.mobile
    }).subscribe(res => {
      load({ mode: "sandbox" }).then(cashfree => {
        cashfree.checkout({
          paymentSessionId: res.payment_session_id,
          redirectTarget: "_self"
        });
      });
    });
  }


  setAmount(value: number) {
    this.selectedAmount = value;
    this.donationForm.patchValue({ amount: value });
  }

  toggleLanguage() {
    this.selectedLang = this.selectedLang === 'en' ? 'mr' : 'en';
    localStorage.setItem('lang', this.selectedLang);
    location.reload(); // Refresh to re-render text if needed
  }

  isScrolled = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Add scrolled class after 50px
    this.isScrolled = window.scrollY > 50;
  }

  activeSection = 'home';
  onSectionChange(sectionId: any) {
    this.activeSection = sectionId;
  }


    onSubmita() {
    if (this.donationForm.valid) {
      console.log('Form Values:', this.donationForm.value);
      // You can send this data to Razorpay API or backend
    } else {
      console.log('Form is invalid');
      this.donationForm.markAllAsTouched();
    }
  }

    onDonate() {
    this.paymentService.createOrder(100).subscribe((res) => {
      const cashfree = new this.cashfree({ mode: 'sandbox' }); // or 'production'
      cashfree.checkout({ paymentSessionId: res.payment_session_id });
    });
  }

}
