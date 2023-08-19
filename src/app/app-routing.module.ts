import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UsersComponent } from './pages/users/users.component';
import { EditRestaurantComponent } from './pages/edit-restaurant/edit-restaurant.component';
import { RestaurantGestionComponent } from './pages/restaurant-gestion/restaurant-gestion.component';
import { AddRestaurantComponent } from './pages/add-restaurant/add-restaurant.component';

const routes: Routes = [
  {
    path:'home', component: HomeComponent
  },
  {
    path:'restaurants', component: RestaurantsComponent
  },
  {
    path:'restaurants/edit', component: EditRestaurantComponent
  },
  {
    path:'restaurants/add', component: AddRestaurantComponent
  },
  {
    path:'restaurants/:id', component: RestaurantGestionComponent
  },
  {
    path:'login', component: LoginComponent
  },
  {
    path:'register', component: RegisterComponent
  },
  {
    path:'profile/:id', component: ProfileComponent
  },
  {
    path:'users', component: UsersComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
