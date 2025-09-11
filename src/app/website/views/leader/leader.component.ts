import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-leader',
   imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './leader.component.html',
  styleUrl: './leader.component.scss'
})
export class LeaderComponent {

  selectedLang: 'en' | 'mr' = 'en'; // or dynamically detect/set
  contactForm: FormGroup;
  isScrolled = false;

leaderContent = [
  {
    id: 1,
    title: {
      en: 'Shri. Chandan Dada Chavan',
      mr: 'श्री. चंदनदादा चव्हाण'
    },
    subtitle: {
      en: 'Party Chief: Jai Hind Sena, Maharashtra State.',
      mr: 'पक्षप्रमुख : जय हिंद सेना, महाराष्ट्र राज्य.'
    },
      image: 'assets/image/leader-image.png',
    paragraphs: [
      {
        en: 'Land holders in "Gunthawari" do not require a new law to have their names added to the 7/12 extract – Shri Chandan Dada Chavan.',
        mr: 'गुंठेवारी धारकांना ७/१२ वर नावे लागण्यासाठी नव्या कायद्याची गरज नाही – चंदनदादा चव्हाण.'
      },
      {
        en: 'In Maharashtra’s political landscape, Shri Chandan Dada Chavan stands as a dedicated leader with a deep connection to the people.',
        mr: 'महाराष्ट्राच्या राजकीय क्षेत्रात श्री. चंदनदादा चव्हाण हे जनतेशी घट्ट नातं ठेवणारे समर्पित नेते म्हणून उभे आहेत.'
      },
      {
        en: 'With commitment and passion, he has been instrumental in bringing transformative changes for the welfare of citizens.',
        mr: 'समर्पण आणि जिद्दीने त्यांनी नागरिकांच्या कल्याणासाठी परिवर्तनकारी बदल घडवून आणले आहेत.'
      }
    ]
  },
{
  id: 2,
  title: {
    en: 'Shri. Ranjit Chavan',
    mr: 'श्री. रंजीत चव्हाण'
  },
  subtitle: {
    en: 'Senior Leader & Youth Head: Jai Hind Sena, Maharashtra State.',
    mr: 'वरिष्ठ नेते व युवा प्रमुख : जय हिंद सेना, महाराष्ट्र राज्य.'
  },
  image: 'assets/image/rannji-chavan.png',
  paragraphs: [
    {
      en: 'Shri Ranjit Chavan has been actively working at the grassroots level to empower youth and farmers.',
      mr: 'श्री. रंजीत चव्हाण युवक व शेतकऱ्यांच्या सक्षमीकरणासाठी तळागाळात सक्रियपणे कार्यरत आहेत.'
    },
    {
      en: 'With his strong vision, he continues to strengthen the organizational structure of Jai Hind Sena across Maharashtra.',
      mr: 'त्यांच्या ठाम दृष्टिकोनामुळे ते महाराष्ट्रभर जय हिंद सेनेची संघटनात्मक रचना मजबूत करत आहेत.'
    },
    {
      en: 'Known for his dedication and accessibility, he remains a trusted leader among people.',
      mr: 'समर्पण व सहज उपलब्धतेमुळे ते जनतेत विश्वासार्ह नेते म्हणून ओळखले जातात.'
    },
    {
      en: 'As Youth Head, he inspires thousands of young minds to participate in nation-building activities.',
      mr: 'युवा प्रमुख म्हणून ते हजारो तरुणांना राष्ट्रनिर्माणाच्या कार्यात सहभागी होण्यासाठी प्रेरित करतात.'
    },
    {
      en: 'Under his leadership, various youth-centric initiatives such as employment drives, skill development programs, and social awareness campaigns are being implemented.',
      mr: 'त्यांच्या नेतृत्वाखाली रोजगार मोहिमा, कौशल्य विकास कार्यक्रम आणि सामाजिक जनजागृती अभियानासारख्या विविध युवक-केंद्रित उपक्रमांची अंमलबजावणी होत आहे.'
    }
  ]
},
{
  id: 3,
  title: {
    en: 'Dr. Abdul Mannan Shaikh',
    mr: 'डॉ. अब्दुल मन्नान शेख'
  },
  subtitle: {
    en: 'Chief Leader & State Spokesperson: Jai Hind Sena, Maharashtra.',
    mr: 'प्रमुख नेते व राज्य प्रवक्ते : जय हिंद सेना, महाराष्ट्र.'
  },
  image: 'assets/image/dr.abdullmnanshaikh.jpeg',
  paragraphs: [
    {
      en: 'Dr. Abdul Mannan Shaikh is a respected leader who has been a strong voice for social justice and equality.',
      mr: 'डॉ. अब्दुल मन्नान शेख हे सामाजिक न्याय व समानतेसाठी ठामपणे आवाज उठवणारे एक आदरणीय नेते आहेत.'
    },
    {
      en: 'As the State Spokesperson of Jai Hind Sena, he effectively represents the party’s vision and ideology across Maharashtra.',
      mr: 'जय हिंद सेनेचे राज्य प्रवक्ते म्हणून ते महाराष्ट्रभर पक्षाची विचारधारा व दृष्टीकोन प्रभावीपणे मांडतात.'
    },
    {
      en: 'Known for his articulate speeches and clear communication, he has become a trusted face for the organization.',
      mr: 'त्यांच्या प्रभावी भाषणशैली व स्पष्ट संवादामुळे ते संघटनेचे विश्वासार्ह चेहरे बनले आहेत.'
    },
    {
      en: 'He has also been actively working for the upliftment of minority communities, education, and healthcare awareness.',
      mr: 'ते अल्पसंख्याक समाजाच्या प्रगतीसाठी, शिक्षणासाठी आणि आरोग्य जनजागृतीसाठी सक्रियपणे कार्यरत आहेत.'
    },
    {
      en: 'Through his leadership, Jai Hind Sena continues to expand its reach and strengthen its voice in the state.',
      mr: 'त्यांच्या नेतृत्वामुळे जय हिंद सेना राज्यात आपली पोहोच वाढवत असून, आपला आवाज अधिक ताकदीने मांडत आहे.'
    }
  ]
},
{
  id: 4,
  title: {
    en: 'Shri. Milind Inamdar',
    mr: 'श्री. मिलिंद इनामदार'
  },
  subtitle: {
    en: 'State Deputy Chief (Descendant of Veer Sidnak): Jai Hind Sena, Maharashtra.',
    mr: 'राज्य उपप्रमुख (वीर सिदनाक वंशज) : जय हिंद सेना, महाराष्ट्र.'
  },
  image: 'assets/image/Milind Inamdar.jpeg',
  paragraphs: [
    {
      en: 'Shri Milind Inamdar proudly carries the legacy of Veer Sidnak and continues to inspire people with his commitment to courage and service.',
      mr: 'श्री. मिलिंद इनामदार हे वीर सिदनाकांचा गौरवशाली वारसा अभिमानाने पुढे नेत असून, शौर्य व सेवाभावाने जनतेला प्रेरणा देत आहेत.'
    },
    {
      en: 'As the State Deputy Chief of Jai Hind Sena, he plays a crucial role in strengthening the organization at different levels.',
      mr: 'जय हिंद सेनेचे राज्य उपप्रमुख म्हणून ते विविध स्तरावर संघटना मजबूत करण्याचे महत्त्वपूर्ण कार्य करतात.'
    },
    {
      en: 'Known for his leadership qualities and dedication, he works closely with youth and grassroots workers.',
      mr: 'नेतृत्वगुण व समर्पणामुळे ते युवक आणि तळागाळातील कार्यकर्त्यांबरोबर घट्टपणे कार्य करतात.'
    },
    {
      en: 'He actively promotes cultural values, unity, and the spirit of sacrifice inspired by his ancestral lineage.',
      mr: 'आपल्या वंशपरंपरेतून प्रेरित होऊन ते सांस्कृतिक मूल्ये, एकता आणि त्यागाची भावना सक्रियपणे पुढे नेत आहेत.'
    },
    {
      en: 'His vision is to empower local communities and keep alive the historical contributions of Veer Sidnak.',
      mr: 'स्थानिक समाजाचे सक्षमीकरण करणे व वीर सिदनाकांच्या ऐतिहासिक कार्याला जिवंत ठेवणे ही त्यांची दूरदृष्टी आहे.'
    }
  ]
}
];
leaderId: any;
 leaderContents: any;

  constructor(private route: ActivatedRoute,private userService:UserService, private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      subject: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
 const id = Number(this.route.snapshot.paramMap.get('id'));
    this.leaderContents = this.leaderContent.find(l => l.id === id);

    const storedLang = localStorage.getItem('lang') as 'en' | 'mr';
    if (storedLang) {
      this.selectedLang = storedLang;
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.userService.postpassDataApi(this.contactForm.value).subscribe({
        next: () => {

          Swal.fire('Success', 'Message sent successfully!', 'success');
          this.contactForm.reset();
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
