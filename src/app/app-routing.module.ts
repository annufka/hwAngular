import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {CatalogComponent} from './catalog/catalog.component';
import {RegistrationComponent} from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'catalog', component: CatalogComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'cart', component: CartComponent},
  {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
