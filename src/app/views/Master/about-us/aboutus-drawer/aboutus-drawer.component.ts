import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApiService } from '../../../../services/api.service';


@Component({
  selector: 'app-aboutus-drawer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './aboutus-drawer.component.html',
  styleUrl: './aboutus-drawer.component.scss',
})
export class AboutusDrawerComponent {
  @Input() drawerVisible: boolean = false;
  @Input() drawerClose: () => void = () => {};

  homeData: any = {
    id: 0,
    description: '',
    title:'',
    image: null,
  };

  previewImage: string | ArrayBuffer | null = null;
  isLoading: boolean = false;

  constructor(private api: ApiService) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => this.previewImage = reader.result;
      reader.readAsDataURL(file);
      this.homeData.image = file;
    }
  }

  save(form: any): void {
    this.isLoading = true;

    // Validate
    if (!this.homeData.description.trim()) {
      Swal.fire('Error', 'Please enter the Description', 'error');
      this.isLoading = false;
      return;
    }

    if (!this.homeData.image && this.homeData.id === 0) {
      Swal.fire('Error', 'Please upload an Image', 'error');
      this.isLoading = false;
      return;
    }

    const formData = new FormData();
    formData.append('description', this.homeData.description);

    if (this.homeData.image) {
      formData.append('image', this.homeData.image);
    }

    const isNew = !this.homeData.id || this.homeData.id === 0;
    const apiUrl = isNew ? 'api/AboutUs/upload' : `api/AboutUs/update/${this.homeData.id}`;

    const apiCall = isNew
      ? this.api.postDataApi(apiUrl, formData)
      : this.api.updateDataApi('api/AboutUs/update', formData, this.homeData.id);

    apiCall.subscribe({
      next: (res) => {
        Swal.fire('Success!', isNew ? 'Saved Successfully' : 'Updated Successfully', 'success');
        this.isLoading = false;
        this.clearForm(form);
        this.getData(); // Optional: reload list
      },
      error: (err) => {
        const errorMessage = err?.error?.message || err?.message || 'Operation failed';
        Swal.fire('Error!', errorMessage, 'error');
        this.isLoading = false;
      }
    });
  }

  clearForm(form: any): void {
    this.homeData = { id: 0, description: '', image: null };
    this.previewImage = null;
    form.resetForm();
  }

  getData(): void {
    // Optional: implement if you're listing or refreshing the data elsewhere
  }
}
