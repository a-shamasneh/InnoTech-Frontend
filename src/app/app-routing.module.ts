import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './report/report.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { MetareportComponent } from './metareport/metareport.component';
import { AuthGuardGuard } from './auth-guard.guard';


const routes: Routes = [
  { path: 'home', component: HomeComponent ,canActivate: [AuthGuardGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'report', component: ReportComponent ,canActivate: [AuthGuardGuard]},
  { path: 'meta', component: MetareportComponent ,canActivate: [AuthGuardGuard]},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
