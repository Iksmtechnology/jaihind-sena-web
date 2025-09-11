import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-contactus-master',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './contactus-master.component.html',
  styleUrl: './contactus-master.component.scss'
})
export class ContactusMasterComponent {

  contactForm!: FormGroup;

  constructor( private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.contactForm = this.fb.group({
      subject: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }


  onSubmit() {
    if (this.contactForm.valid) {
      this.userService.postpassDataApi(this.contactForm.value).subscribe({
        next: () => {
          Swal.fire('Success', 'Message sent successfully!', 'success');
          // this.contactForm.reset();
        },
        error: (err) => {
          const message = err?.error?.message || 'Something went wrong.';
          Swal.fire('Error', message, 'error');
        }
      });
      this.contactForm.reset();
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  //  onSubmit(): void {
  //   if (this.contactForm.invalid) {
  //     this.contactForm.markAllAsTouched();
  //     return;
  //   }

  //   console.log('Form Data:', this.contactForm.value);
  //   alert('Contact form submitted successfully!');
  //   this.contactForm.reset();
  // }

  // getData() {
  //   this.api.getDataApi(this.apiKey).subscribe((res: any) => {
  //     this.contactList = res;
  //   })
  // }
}
