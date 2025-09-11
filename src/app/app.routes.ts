import { Routes } from '@angular/router';
import { HomeComponent } from './website/views/home/home.component';
import { JhsLeadershipComponent } from './website/views/jhs-leadership/jhs-leadership.component';
import { JhsLeadershipByIdComponent } from './website/views/jhs-leadership-by-id/jhs-leadership-by-id.component';
import { DonationComponent } from './website/views/donation/donation.component';
import { LeaderComponent } from './website/views/leader/leader.component';
import { BecomeMemberComponent } from './website/views/become-member/become-member.component';
import { BecomeMemberByIdComponent } from './website/views/become-member-by-id/become-member-by-id.component';
import { WebsiteLayoutComponent } from './website/layout/website-layout/website-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { AboutUsComponent } from './website/views/about-us/about-us.component';
import { TermsConditionsComponent } from './website/views/terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './website/views/privacy-policy/privacy-policy.component';
export const routes: Routes = [

  {
    path: '',
    component: WebsiteLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'donation', component: DonationComponent },
      { path: 'leader', component: LeaderComponent },
      { path: 'leader/:id', component: LeaderComponent },
      { path: 'jhs-leadership', component: JhsLeadershipComponent },
      { path: 'jhs-leadership/:id', component: JhsLeadershipByIdComponent },
      { path: 'become-leader-member', component: BecomeMemberComponent },
      { path: 'become-leader-member/:id', component: BecomeMemberByIdComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'terms-conditions', component: TermsConditionsComponent },
      { path: 'privacy-policy', component: PrivacyPolicyComponent },




    ]
  },

  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },


  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin',
    loadComponent: () => import('./layout').then(m => m.DefaultLayoutComponent),
    canActivate: [AuthGuard],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes)
      },

      {
        path: 'Master',
        loadChildren: () => import('./views/Master/routes').then((m) => m.routes)
      },

    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
