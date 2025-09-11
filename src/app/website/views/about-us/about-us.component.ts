import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about-us',
   imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {
  selectedLang: 'en' | 'mr' = 'en'; // or dynamically detect/set

  constructor() {}



    toggleLanguage() {
    this.selectedLang = this.selectedLang === 'en' ? 'mr' : 'en';
    localStorage.setItem('lang', this.selectedLang);
    location.reload(); // Refresh to re-render text if needed
  }

    activeSection = 'home';
  onSectionChange(sectionId: any) {
    this.activeSection = sectionId;
  }

  isScrolled = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Add scrolled class after 50px
    this.isScrolled = window.scrollY > 50;
  }

}

