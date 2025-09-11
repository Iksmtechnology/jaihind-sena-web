import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-videos-upload',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule,NgxPaginationModule],
  templateUrl: './videos-upload.component.html',
  styleUrl: './videos-upload.component.scss'
})
export class VideosUploadComponent {

  videoForm: FormGroup;
  previewImage: string | ArrayBuffer | null = null;
  getVideoList: any[] = [];
  p: number = 1;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.videoForm = this.fb.group({
      title: ['', Validators.required],
      photo: [null, Validators.required],
      video_link: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
  }


    ngOnInit() {
    this.getVideos()
  }
  // Handle Image Preview
  onPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.videoForm.patchValue({ photo: file });
      const reader = new FileReader();
      reader.onload = () => this.previewImage = reader.result;
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.videoForm.invalid) {
      this.videoForm.markAllAsTouched();
      return;
    }
    this.userService.postDataApi('/post-video.php', this.videoForm.value).subscribe({
      next: (res) => {
        Swal.fire(res.message, 'Video saved successfully');
        // ✅ Reset the form after submit
        this.videoForm.reset();
        // this.getVideos(); // refresh video list if you have
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
      this.videoForm.get('photo')?.setErrors({ fileSize: true });

      return;
    } else {
      // ✅ Clear previous error
      this.videoForm.get('photo')?.setErrors(null);
    }

    // ✅ Convert file to base64
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64String = result.split(',')[1]; // remove prefix

      this.videoForm.patchValue({
        photo: base64String
      });
      this.videoForm.get('photo')?.updateValueAndValidity();
    };

    reader.readAsDataURL(file);
  }
}

  getVideos() {
    this.userService.getDataApi('/fetch-video.php').subscribe({
      next: (res: any) => {
        this.getVideoList = res;
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      }
    });
  }

    // EDIT
    onEdit(leader: any): void {
      // this.isEdit = true;
      // this.editId = leader.id;
      // this.leaderForm.patchValue(leader);
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
              this.getVideos(); // refresh list
            },
            error: (err) => {
              console.error('Error deleting record:', err);
              Swal.fire('Error!', 'Something went wrong while deleting.', 'error');
            }
          });
        }
      });
    }

  onPageChange(page: number) {
    this.p = page;
  }

}
