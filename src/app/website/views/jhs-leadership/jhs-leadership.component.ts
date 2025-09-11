import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-jhs-leadership',
  imports: [CommonModule,RouterModule],
  templateUrl: './jhs-leadership.component.html',
  styleUrl: './jhs-leadership.component.scss'
})
export class JhsLeadershipComponent {

leaders = [
  // {
  //   name: 'Arvind Kejriwal',
  //   title: 'National Convenor, AAP',
  //   image: 'assets/image/leader-image-1.jpg',
  //   facebook: '#',
  //   twitter: '#',
  //   instagram: '#',
  //   email: 'arvind.kejriwal@example.com',
  //   description: 'Arvind Kejriwal is the National Convenor of AAP and Chief Minister of Delhi, known for his focus on education, healthcare, and transparent governance.'
  // },
  {
    name: 'Atishi',
    title: 'Leader of Opposition, Delhi',
    image: 'assets/image/leader-image-1.jpg',
    facebook: '#',
    twitter: '#',
    instagram: '#',
    email: 'atishi@example.com',
    description: 'Atishi Marlena is an education reformist and political leader, recognized for her work in transforming Delhi’s government schools and policy making.'
  },
  {
    name: 'Dr. Sandeep Pathak',
    title: 'National Organisation Secretary',
    image: 'assets/image/leader-image-1.jpg',
    facebook: '#',
    twitter: '#',
    instagram: '#',
    email: 'sandeep.pathak@example.com',
    description: 'Dr. Sandeep Pathak plays a key role in AAP’s organizational strategy, with a strong background in grassroots political campaigning.'
  },
  {
    name: 'Arvind Kejriwal',
    title: 'National Convenor, AAP',
    image: 'assets/image/leader-image-1.jpg',
    facebook: '#',
    twitter: '#',
    instagram: '#',
    email: 'arvind.kejriwal@example.com',
    description: 'Arvind Kejriwal is the National Convenor of AAP and Chief Minister of Delhi, known for his focus on education, healthcare, and transparent governance.'
  },
  {
    name: 'Atishi',
    title: 'Leader of Opposition, Delhi',
    image: 'assets/image/leader-image-1.jpg',
    facebook: '#',
    twitter: '#',
    instagram: '#',
    email: 'atishi@example.com',
    description: 'Atishi Marlena is an education reformist and political leader, recognized for her work in transforming Delhi’s government schools and policy making.'
  },
  {
    name: 'Dr. Sandeep Pathak',
    title: 'National Organisation Secretary',
    image: 'assets/image/leader-image-1.jpg',
    facebook: '#',
    twitter: '#',
    instagram: '#',
    email: 'sandeep.pathak@example.com',
    description: 'Dr. Sandeep Pathak plays a key role in AAP’s organizational strategy, with a strong background in grassroots political campaigning.'
  },
  {
    name: 'Arvind Kejriwal',
    title: 'National Convenor, AAP',
    image: 'assets/image/leader-image-1.jpg',
    facebook: '#',
    twitter: '#',
    instagram: '#',
    email: 'arvind.kejriwal@example.com',
    description: 'Arvind Kejriwal is the National Convenor of AAP and Chief Minister of Delhi, known for his focus on education, healthcare, and transparent governance.'
  },
  {
    name: 'Atishi',
    title: 'Leader of Opposition, Delhi',
    image: 'assets/image/leader-image-1.jpg',
    facebook: '#',
    twitter: '#',
    instagram: '#',
    email: 'atishi@example.com',
    description: 'Atishi Marlena is an education reformist and political leader, recognized for her work in transforming Delhi’s government schools and policy making.'
  },
  {
    name: 'Dr. Sandeep Pathak',
    title: 'National Organisation Secretary',
    image: 'assets/image/leader-image-1.jpg',
    facebook: '#',
    twitter: '#',
    instagram: '#',
    email: 'sandeep.pathak@example.com',
    description: 'Dr. Sandeep Pathak plays a key role in AAP’s organizational strategy, with a strong background in grassroots political campaigning.'
  }
];

getList:any[] = []

selectedLang: 'en' | 'mr' = 'en';

constructor( private userService:UserService){}

  ngOnInit(): void {
    const storedLang = localStorage.getItem('lang') as 'en' | 'mr';
    if (storedLang) {
      this.selectedLang = storedLang;
    }
    this.getData()
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
