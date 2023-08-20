import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';
import { UsersComponent } from './pages/users/users.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { EditRestaurantComponent } from './pages/edit-restaurant/edit-restaurant.component';
import { RestaurantGestionComponent } from './pages/restaurant-gestion/restaurant-gestion.component';
import { AddRestaurantComponent } from './pages/add-restaurant/add-restaurant.component';
import { CommentsComponent } from './pages/comments/comments.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    RestaurantsComponent,
    RestaurantGestionComponent,
    UsersComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    EditRestaurantComponent,
    AddRestaurantComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
