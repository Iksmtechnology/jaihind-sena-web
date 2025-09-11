import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Master'
    },
    children: [
      {
        path: '',
        redirectTo: 'cards',
        pathMatch: 'full'
      },
      // {
      //   path: 'home',
      //   loadComponent: () => import('./home master/home-master/home-master.component').then(m => m.HomeMasterComponent),
      //   data: {
      //     title: 'Home'
      //   }
      // },
      {
        path: 'contactus',
        loadComponent: () => import('./contactus-master/contactus-master.component').then(m => m.ContactusMasterComponent),
        data: {
          title: 'Contact Us'
        }
      },
        {
        // path: 'leader/:leaderId',
        path: 'leader',
        loadComponent: () => import('./leader/leader.component').then(m => m.LeaderComponent),
        data: {
          title: 'Leader'
        }
      },
           {
        path: 'gallery',
        loadComponent: () => import('./gallery/gallery.component').then(m => m.GalleryComponent),
        data: {
          title: 'Gallery'
        }
      },
    {
        path: 'videos-upload',
        loadComponent: () => import('./videos-upload/videos-upload.component').then(m => m.VideosUploadComponent),
        data: {
          title: 'videos-upload'
        }


      },


    ]
  }
];


