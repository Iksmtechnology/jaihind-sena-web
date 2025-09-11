import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SupabaseApiService } from '../../../services/supabase-api.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RazorpayService } from '../../../services/razorpay.service';
import { UserService } from '../../../services/user.service';
import { load } from '@cashfreepayments/cashfree-js';
import { HttpClient } from '@angular/common/http';


 interface CashfreeCheckoutOptions {
  paymentSessionId: string;
  redirectTarget: string;
  onSuccess: (result: any) => void;
  onFailure?: (result: any) => void;
  onDismiss?: () => void;
}

@Component({
  selector: 'app-become-member',
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './become-member.component.html',
  styleUrl: './become-member.component.scss'
})



export class BecomeMemberComponent {


  newsMediaHeading = {
    en: 'News Media',
    mr: 'न्यूज़ मीडिया'
  };
  contactForm: FormGroup;
  leaderForm: FormGroup;
  memberForm: FormGroup;


  selectedLang: 'en' | 'mr' = 'en'; // or dynamically detect/set


  constructor(private route: ActivatedRoute, private userService: UserService, private fb: FormBuilder, private razorpayService: RazorpayService, private router: Router,private http: HttpClient) {
    this.contactForm = this.fb.group({
      subject: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });

    this.leaderForm = this.fb.group({
      memberId: [Math.floor(100000 + Math.random() * 900000)], // 👈 random id
      fullName: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      photo: ['', Validators.required],
      address: ['', Validators.required],
      confirmAge: [false, Validators.requiredTrue],
      amount: ['1000', Validators.required],  // default
      role: ['leader'], // fixed role
      // image:['',Validators.required]
    });
    this.memberForm = this.fb.group({
       memberId: [`MEM${Math.floor(100000 + Math.random() * 900000)}`],
      fullName: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      photo: [''],
      address: ['', Validators.required],
      confirmAge: [false, Validators.requiredTrue],
      amount: [''],  // default
      role: [''] // fixed role
    });
    // fullname, mobile, pan, pincode, referrerPhone, confirmAge, amount, email, photo, address, role,
  }

  ngOnInit(): void {
    const storedLang = localStorage.getItem('lang') as 'en' | 'mr';
    if (storedLang) {
      this.selectedLang = storedLang;
    }

    this.route.queryParams.subscribe(params => {
      const amount = +params['amount'] || 0;
      if (amount > 0) {
        this.razorpayService.openPayment(amount);
      }
    });
  }




onSubmit() {
  if (this.memberForm.invalid) {
    alert("Please fill all required fields correctly.");
    return;
  }

  const formValues = this.memberForm.value;

  // Step 1: Create order
  this.http.post<any>('http://localhost/api/create_order.php', {
    amount: formValues.amount,
    name: formValues.fullName,
    email: formValues.email,
    phone: formValues.mobile
  }).subscribe({
    next: (res) => {
      // Step 2: Launch Cashfree checkout
      load({ mode: "sandbox" }).then((cashfree: any) => {
        const options: CashfreeCheckoutOptions = {
          paymentSessionId: res.payment_session_id,
          redirectTarget: "_self",

          // ✅ Payment success
          onSuccess: (paymentResult: any) => {
            console.log('Payment successful:', paymentResult);


          },

          // ❌ Payment failure
          onFailure: (paymentResult: any) => {
            console.log('Payment failed:', paymentResult);
            Swal.fire('Payment Failed', 'Please try again.', 'error');
          },

          // 👋 User closed popup
          onDismiss: () => {
            console.log('Payment popup closed by user');
          }
        };

        // ✅ Pass options
        cashfree.checkout(options as CashfreeCheckoutOptions);
      });

      if(res){
            const memberId = this.memberForm.get('memberId')?.value;

            this.userService.postDataApi('/payment-member.php', this.memberForm.value)
              .subscribe({
                next: () => {
                  // Swal.fire('Success', 'Payment and data saved successfully!', 'success');
                  this.router.navigate(['/become-leader-member', memberId]);
                  this.memberForm.reset();
                },
                error: (err) => {
                  const message = err?.error?.message || 'Something went wrong while saving data.';
                  Swal.fire('Error', message, 'error');
                }
              });
      }
    },
    error: () => {
      Swal.fire('Error', 'Failed to create order. Try again.', 'error');
    }
  });
}




  onSubmits() {

    if (this.memberForm.valid) {
      const memberId = this.memberForm.get('memberId')?.value;

      this.userService.postDataApi('/payment-member.php', this.memberForm.value).subscribe({
        next: () => {

          Swal.fire('Success', 'Message sent successfully!', 'success');
          // this.contactForm.reset();

          // 👇 Navigate dynamically with memberId
          this.router.navigate(['/become-leader-member', memberId]);
        },
        error: (err) => {
          const message = err?.error?.message || 'Something went wrong.';
          Swal.fire('Error', message, 'error');
        }
      });
      this.memberForm.reset();
    } else {
      this.memberForm.markAllAsTouched();
    }
  }

  amount!: number;
  onDonate() {
    const minAmount = 0;

    if (!this.amount || this.amount < minAmount) {
      alert(`Minimum donation is ₹${minAmount}`);
      return;
    }

    this.razorpayService.openPayment(this.amount);
  }

formRole: 'leader' | 'member' = 'member';
openForm(type: 'leader' | 'member') {
  this.formRole = type;

  if (type === 'leader') {
    this.memberForm.patchValue({
      role: 'Leader',
      amount: "1000"
    });
  } else {
    this.memberForm.patchValue({
      role: 'Member',
      amount: "100"
    });
  }
}




  onFileSelected(event: any) {
  const file: File = event.target.files[0];

  if (file) {
    const maxSize = 200 * 1024; // 200 KB limit

    if (file.size > maxSize) {
      // ❌ Block the file selection
      event.target.value = ''; // clear input

      // Set error on form control
      this.memberForm.get('photo')?.setErrors({ fileSize: true });

      return;
    } else {
      // ✅ Clear previous error
      this.memberForm.get('photo')?.setErrors(null);
    }

    // ✅ Convert file to base64
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64String = result.split(',')[1]; // remove prefix

      this.memberForm.patchValue({
        photo: base64String
      });
      this.memberForm.get('photo')?.updateValueAndValidity();
    };

    reader.readAsDataURL(file);
  }
}

  isScrolled = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Add scrolled class after 50px
    this.isScrolled = window.scrollY > 50;
  }

  toggleLanguage() {
    this.selectedLang = this.selectedLang === 'en' ? 'mr' : 'en';
    localStorage.setItem('lang', this.selectedLang);
    location.reload(); // Refresh to re-render text if needed
  }

  activeSection = 'home';
  onSectionChange(sectionId: any) {
    this.activeSection = sectionId;
  }


    onSubmit_leader() {
    if (this.leaderForm.valid) {
      const memberId = this.leaderForm.get('memberId')?.value;

      this.userService.postDataApi('/payment-leader.php', this.leaderForm.value).subscribe({
        next: () => {

          Swal.fire('Success', 'Message sent successfully!', 'success');
          // this.leaderForm.reset();

          // 👇 Navigate dynamically with memberId
          this.router.navigate(['/become-leader-member', memberId]);

        },
        error: (err) => {
          const message = err?.error?.message || 'Something went wrong.';
          Swal.fire('Error', message, 'error');
        }
      });
      this.leaderForm.reset();
    } else {
      this.leaderForm.markAllAsTouched();
    }
  }
  onFileSelected_old(event: any) {
    const file = event.target.files[0];

    if (file) {
      // size validation (500 KB)
      if (file.size > 500 * 1024) {
        this.leaderForm.get('photo')?.setErrors({ fileSize: true });
        return;
      } else {
        this.leaderForm.get('photo')?.setErrors(null);
      }

      const reader = new FileReader();
      reader.onload = () => {
        // Remove prefix (e.g., data:image/jpeg;base64,)
        let base64String = (reader.result as string).split(',')[1];
        // console.log(base64String, '<=== base64String')

        this.leaderForm.patchValue({
          photo: base64String
        });
      };
      reader.readAsDataURL(file);
    }
  }
}
