import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-leader',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule, NgxPaginationModule],
  templateUrl: './leader.component.html',
  styleUrl: './leader.component.scss'
})
export class LeaderComponent {


  galleryForm: FormGroup;
  p: number = 1;


  getList: any[] = [];


  constructor(private fb: FormBuilder,private userService:UserService, private http: HttpClient, private sanitizer: DomSanitizer) {
    this.galleryForm = this.fb.group({
      fullname: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      image_url: ['', Validators.required],
      email: ['', Validators.required],
      contact: ['', Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      // Social Media Links
      facebook: ['', Validators.required],
      instagram: ['', Validators.required],
      twitter: [''],
      youtube: [''],
      role: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getData()
  }


  onSubmit() {
    if (this.galleryForm.invalid) {
      this.galleryForm.markAllAsTouched();
      return;
    }
    // since image is already base64, no FormData needed
    this.userService.postLeaderApi(this.galleryForm.value).subscribe({
      next: (res) => {
        Swal.fire(res.message, 'Data saved successfully');
         // ✅ Reset the form after submit
        this.galleryForm.reset();
        this.getData()
      },
      error: (err) => {
        Swal.fire('Error', 'Something went wrong!');
        console.error(err);
      }
    });
  }


    onFileSelected(event: any) {
  const file: File = event.target.files[0];

  if (file) {
    const maxSize = 200 * 1024; // 200 KB limit

    if (file.size > maxSize) {
      // ❌ Block the file selection
      event.target.value = ''; // clear input

      // Set error on form control
      this.galleryForm.get('image_url')?.setErrors({ fileSize: true });

      return;
    } else {
      // ✅ Clear previous error
      this.galleryForm.get('image_url')?.setErrors(null);
    }

    // ✅ Convert file to base64
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64String = result.split(',')[1]; // remove prefix

      this.galleryForm.patchValue({
        image_url: base64String
      });
      this.galleryForm.get('image_url')?.updateValueAndValidity();
    };

    reader.readAsDataURL(file);
  }
}

  getData() {
    this.userService.getDataApi('/fetch-leader.php').subscribe({
      next: (res: any) => {
        this.getList = res;
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      }
    });
  }



  getSafeImageUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  onPageChange(page: number) {
    this.p = page;
  }

  // EDIT
  onEdit(leader: any): void {
    // this.isEdit = true;
    // this.editId = leader.id;
    // this.galleryForm.patchValue(leader);
  }

  // DELETE
  onDelete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgba(255, 133, 26, 1)',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteDataApi('/delete-leader.php', id).subscribe({
          next: (res: any) => {
            Swal.fire('Deleted!', 'Data has been deleted successfully.', 'success');
            this.getData(); // refresh list
          },
          error: (err) => {
            console.error('Error deleting record:', err);
            Swal.fire('Error!', 'Something went wrong while deleting.', 'error');
          }
        });
      }
    });
  }


}


  // onFileSelecteds(event: any) {
  //   const file = event.target.files[0];

  //   if (file) {
  //     // size validation (500 KB)
  //     if (file.size > 500 * 1024) {
  //       this.galleryForm.get('image_url')?.setErrors({ fileSize: true });
  //       return;
  //     } else {
  //       this.galleryForm.get('image_url')?.setErrors(null);
  //     }

  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       // Remove prefix (e.g., data:image/jpeg;base64,)
  //       let base64String = (reader.result as string).split(',')[1];
  //       console.log(base64String, '<=== base64String')

  //       this.galleryForm.patchValue({
  //         image_url: base64String
  //       });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

