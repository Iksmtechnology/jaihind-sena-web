import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gallery',
  imports: [FormsModule, CommonModule,ReactiveFormsModule, RouterModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {

   galleryForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.galleryForm = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      image_url: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.galleryForm.invalid) {
      alert('Please fill all required fields');
      return;
    }
    console.log(this.galleryForm.value);
    // TODO: Add Supabase insert API call here
  }
}
