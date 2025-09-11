import { Component } from '@angular/core';
import { AboutusDrawerComponent } from '../aboutus-drawer/aboutus-drawer.component';
import { ApiService } from '../../../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aboutus-master',
  imports: [AboutusDrawerComponent,CommonModule],
  templateUrl: './aboutus-master.component.html',
  styleUrl: './aboutus-master.component.scss'
})
export class AboutusMasterComponent {
  formTitle = "About Us Master"
  AboutList: any = [];
  apiKey: string = 'api/AboutUs';
  homeList = [
    { description: 'Welcome to Our Website', imageUrl: 'https://via.placeholder.com/100' },
    { description: 'Explore Our Services', imageUrl: '' }
  ];
  constructor(private api: ApiService) {

  }
  ngOnInit() {
    this.getData();
  }
  getData() {
    this.api.getDataApi(this.apiKey).subscribe((res: any) => {
      this.AboutList = res;
    })
  }
  edit(item: any): void {
    alert('Edit clicked: ' + item.description);
  }

  delete(item: any): void {
    const index = this.homeList.indexOf(item);
    if (index !== -1) {
      this.homeList.splice(index, 1);
    }
  }
  drawerTitle = "Add New picture";
  // drawerData: CustmoerCategoryData = new CustmoerCategoryData();
  drawervisible = false;
  add() {
    this.drawerTitle = "Add new Picture";
    // this.drawerData = new CustmoerCategoryData();
    this.drawervisible = true;
  }
  drawerClose(): void {
    this.drawervisible = false;
  }

  closeCallback = () => {
    this.drawerClose();
  };

}
