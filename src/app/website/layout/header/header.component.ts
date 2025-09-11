import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, computed, HostListener, inject } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { AvatarComponent, BadgeComponent, BreadcrumbRouterComponent, ColorModeService, ContainerComponent, DropdownComponent, DropdownDividerDirective, DropdownHeaderDirective, DropdownItemDirective, DropdownMenuDirective, DropdownToggleDirective, HeaderNavComponent, HeaderTogglerDirective, NavItemComponent, NavLinkDirective, SidebarToggleDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [ CommonModule,RouterModule, RouterLink, RouterLinkActive ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @ViewChild('navbar') element!: ElementRef;

  constructor(private renderer: Renderer2, public colorModeService: ColorModeService) {}

  ngAfterViewInit() {
    // You can log this.element here if needed
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.scrollY;
    if (this.element?.nativeElement) {
      this.renderer.setStyle(this.element.nativeElement, 'transform', `translateY(${offset}px)`);
    }
  }

  setDarkMode() {
    this.renderer.removeClass(document.body, 'light-mode');
    this.renderer.addClass(document.body, 'dark-mode');
  }

  setLightMode() {
    this.renderer.removeClass(document.body, 'dark-mode');
    this.renderer.addClass(document.body, 'light-mode');
  }



    readonly #colorModeService = inject(ColorModeService);
  readonly colorMode = this.#colorModeService.colorMode;

  readonly colorModes = [
    { name: 'light', text: 'Light', icon: 'cilSun' },
    { name: 'dark', text: 'Dark', icon: 'cilMoon' },
    { name: 'auto', text: 'Auto', icon: 'cilContrast' }
  ];

  readonly icons = computed(() => {
    const currentMode = this.colorMode();
    return this.colorModes.find(mode => mode.name === currentMode)?.icon ?? 'cilSun';
  });
   isDarkMode = false; 
ngOnInit(): void {
  const savedTheme = localStorage.getItem('theme');
  this.isDarkMode = savedTheme === 'dark';
  this.applyTheme();
}

toggleTheme(): void {
  this.isDarkMode = !this.isDarkMode;
  localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  this.applyTheme();
}

private applyTheme(): void {
  const body = document.body;
  const navbar = document.querySelector('.navbar');

  if (this.isDarkMode) {
    body.classList.add('dark-mode');
    body.classList.remove('light-mode');
    if (navbar) {
      navbar.classList.add('dark-mode');
      navbar.classList.remove('light-mode');
    }
  } else {
    body.classList.add('light-mode');
    body.classList.remove('dark-mode');
    if (navbar) {
      navbar.classList.add('light-mode');
      navbar.classList.remove('dark-mode');
    }
  }
}


  
}
