import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-become-member-by-id',
  imports: [FormsModule, CommonModule,RouterModule],
  templateUrl: './become-member-by-id.component.html',
  styleUrl: './become-member-by-id.component.scss'
})
export class BecomeMemberByIdComponent {

  Id: any;
  getList: any[] = []
   leaderData: any = {};

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    // ✅ Fetch data by ID
    this.Id = this.route.snapshot.paramMap.get('id') || '';
    this.getLeaderById(this.Id);

    // const storedLang = localStorage.getItem('lang') as 'en' | 'mr';
    // if (storedLang) {
    //   this.selectedLang = storedLang;
    // }
    this.getData()
  }


getData() {
  this.userService.getDataApi('/fetch-payment-member.php').subscribe({
    next: (res: any[]) => {
      this.getList = res;
      if (res && res.length > 0) {
        this.getLeaderById(res[0].id); // 👈 pass first element’s ID
      }
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

downloadAsPDF() {
  const card = document.getElementById('idCard');
  if (!card) return;

  html2canvas(card).then(canvas => {
    const imgData = canvas.toDataURL('image/png');

    // Create A5 PDF
    const pdf = new jsPDF('p', 'mm', 'a5');

    const pageWidth = pdf.internal.pageSize.getWidth();   // 148 mm
    const pageHeight = pdf.internal.pageSize.getHeight(); // 210 mm

    // Get image dimensions in pixels
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Scale image to fit A5 while keeping aspect ratio
    const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);

    const imgPrintWidth = imgWidth * ratio;
    const imgPrintHeight = imgHeight * ratio;

    // Center image on A5 page
    const marginX = (pageWidth - imgPrintWidth) / 2;
    const marginY = (pageHeight - imgPrintHeight) / 2;

    pdf.addImage(imgData, 'PNG', marginX, marginY, imgPrintWidth, imgPrintHeight);
    pdf.save('id-card.pdf');
  });
}



  downloadAsImage() {
    const card = document.getElementById('idCard');
    if (!card) return;

    html2canvas(card).then(canvas => {
      const link = document.createElement('a');
      link.download = 'id-card.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }
}
