import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Main'
    },
    children: [
    //   {
    //     path: '',
    //     redirectTo: 'contact',
    //     pathMatch: 'full'
    //   },
      {
        path: 'contact',
        loadComponent: () => import('./contact-us/contact-us.component').then(m => m.ContactUsComponent),
        data: {
          title: 'contact'
        }
      },
    
    ]
  }
];
