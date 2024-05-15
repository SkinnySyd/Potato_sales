import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SalesComponent } from './components/sales/sales.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { AuthGuardService } from './_services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuardService] , children: [ 
  { path: 'new-product', component: NewProductComponent }, // New route for NewProductComponent
  { path: 'sales', component: SalesComponent } // New route for SalesComponent
]},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
