import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user.service';



@Component({
  selector: 'app-jhs-leadership-by-id',
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './jhs-leadership-by-id.component.html',
  styleUrl: './jhs-leadership-by-id.component.scss'
})
export class JhsLeadershipByIdComponent {

  selectedLang: 'en' | 'mr' = 'en';
  leaderName!: string;
  leaderId: any;
  leader: any; // 👈 Store the matched leader here
  contactForm: FormGroup;
  getList: any[] = []
  leaderData: any = {};

  leaders = [
    {
      name: 'Arvind Kejriwal',
      title: 'National Convenor, AAP',
      image: 'assets/image/leader-image-1.jpg',
      facebook: '#',
      twitter: '#',
      instagram: '#',
      email: 'arvind@aap.org',
      description: `
      Arvind Kejriwal is the National Convenor of the Aam Aadmi Party (AAP) and one of India’s most prominent political leaders.
      Known for his focus on education, healthcare, and transparent governance, he has implemented welfare schemes benefiting millions.
    `,
      achievements: [
        'Free and 24-hour electricity',
        'Free water supply to households',
        'Free bus rides for women',
        'Pilgrimage support for senior citizens',
        'Financial support of ₹1000 per month for women above 18 years'
      ]
    },
    {
      name: 'Atishi',
      title: 'Leader of Opposition, Delhi',
      image: 'assets/image/leader-image-1.jpg',
      facebook: '#',
      twitter: '#',
      instagram: '#',
      email: 'atishi@example.com',
      description: `
      Atishi Marlena is an education reformist and political leader,
      recognized for her work in transforming Delhi’s government schools and policy making.
    `,
      achievements: [
        'Revolutionized Delhi government schools',
        'Introduced Happiness Curriculum',
        'Improved teacher training programs',
        'Enhanced infrastructure in education',
        'Promoted women’s education initiatives'
      ]
    },
    {
      name: 'Dr. Sandeep Pathak',
      title: 'National Organisation Secretary',
      image: 'assets/image/leader-image-1.jpg',
      facebook: '#',
      twitter: '#',
      instagram: '#',
      email: 'sandeep.pathak@example.com',
      description: `
      Dr. Sandeep Pathak plays a key role in AAP’s organizational strategy,
      with a strong background in grassroots political campaigning.
    `,
      achievements: [
        'Strengthened party presence across states',
        'Designed data-driven campaign strategies',
        'Mobilized grassroots volunteers nationwide',
        'Enhanced party’s digital outreach',
        'Built strong local leadership networks'
      ]
    }
  ];


  constructor(private route: ActivatedRoute, private userService: UserService, private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      subject: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    // ✅ Fetch data by ID
    this.leaderId = this.route.snapshot.paramMap.get('id') || '';
    this.getLeaderById(this.leaderId);

    const storedLang = localStorage.getItem('lang') as 'en' | 'mr';
    if (storedLang) {
      this.selectedLang = storedLang;
    }
    this.getData()
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.userService.postpassDataApi(this.contactForm.value).subscribe({
        next: () => {
          Swal.fire('Success', 'Message sent successfully!', 'success');
          // this.contactForm.reset();
        },
        error: (err) => {
          const message = err?.error?.message || 'Something went wrong.';
          Swal.fire('Error', message, 'error');
        }
      });
      this.contactForm.reset();
    } else {
      this.contactForm.markAllAsTouched();
    }
  }


  getData() {
    this.userService.getDataApi('/fetch-leader.php').subscribe({
      next: (res: any) => {
        this.getList = res;
        // once data is loaded, pick leader by ID
        this.getLeaderById(this.leaderId);
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      }
    });
  }

  getLeaderById(id: string) {
    if (!id) return;
    this.leaderData = this.getList.find((leader: any) => leader.id == id);
  }

  isScrolled = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleLanguage() {
    this.selectedLang = this.selectedLang === 'en' ? 'mr' : 'en';
    localStorage.setItem('lang', this.selectedLang);
    location.reload();
  }

  activeSection = 'home';
  onSectionChange(sectionId: any) {
    this.activeSection = sectionId;
  }







  //   sendEmail() {
  //   this.http.post('http://localhost:3000/send-email', {
  //     ...this.formData,
  //     leaderEmail: this.leaderEmail
  //   }).subscribe({
  //     next: (res: any) => alert(res.message),
  //     error: () => alert('Error sending email')
  //   });
  // }

  //  onSubmit(){
  // this.submitted = true;
  //  if(this.galleryForm.invalid){
  //    return
  //  }
  // this.galleryForm.value.image_url =  this.images
  // console.log('Images',this.images)
  //    this.supabaseService.postLeaderData().subscribe((res:any)=>{
  //    Swal.fire(res.message,'Data saved successfully')
  //    console.log(res);
  //    // this.router.navigate(['/post/msg']);
  //  })
  // this.submitted = false;
  //  }
}
