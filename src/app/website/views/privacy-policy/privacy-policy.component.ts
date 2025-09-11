import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  imports: [ CommonModule, RouterModule],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {

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
