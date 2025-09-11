
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
 private userService:UserService
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      Swal.fire('Warning!', 'Please enter valid username and password', 'warning');
      return;
    }

    const credentials = this.loginForm.value;

this.userService.postDataApi('/login.php', credentials).subscribe({
  next: (res: any) => {
    if (res.status === "true" && res.message === "Login successful") {
      Swal.fire('Success!', res.message, 'success');
      sessionStorage.setItem('authToken', "true");
      this.router.navigate(['/admin/Master/leader']);
      this.loginForm.reset();
    } else {
      Swal.fire('Error!', res.message || 'Invalid login', 'error');
      this.router.navigate(['/login']); // redirect back to login page
    }
  },
  error: (err) => {
    const errorMessage = err?.error?.message || 'Login failed. Please try again.';
    Swal.fire('Error!', errorMessage, 'error');
    this.router.navigate(['/login']); // redirect if server error
  }
});

  }
}
