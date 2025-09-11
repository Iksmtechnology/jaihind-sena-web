import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-terms-conditions',
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './terms-conditions.component.html',
  styleUrl: './terms-conditions.component.scss'
})
export class TermsConditionsComponent {


    selectedLang: 'en' | 'mr' = 'en'; // or dynamically detect/set
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
}
