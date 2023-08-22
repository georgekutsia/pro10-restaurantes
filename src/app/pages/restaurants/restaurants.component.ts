import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantI } from 'src/app/models/interfaces';
import { UserI } from 'src/app/models/interfaces';
import { RestaurantsService } from 'src/app/shared/services/restaurants.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {
  id!: string;
  restaurant!: RestaurantI;
  restList!: RestaurantI[];
  usuario!: UserI;
  userForFavorite!: any;
  isFavorite: boolean = false;
  restaurantAverages: { [key: string]: number } = {};
  userFavorites: string[] = [];
  loaded: boolean = true;

  constructor(
    private restApi: RestaurantsService,
    private usersService: UsersService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.restApi.getRestaurants().subscribe((data: any) => {
      console.log("Bulala")
      this.restList = [...data];
      this.usuario = JSON.parse(localStorage.getItem('user') || '{}');
      this.userFavorites = this.usuario.favorite || []; 
      this.userForFavorite = this.authService.getUserById(this.usuario.id);
      this.calculateAverages();
      this.loaded= false
    });
  }
  calculateAverages(): void {
    this.restList.forEach((restaurant: RestaurantI) => {
      let totalScore = 0;
      const comments = restaurant.comments;
      if (comments && comments.length > 0) {
        comments.forEach((comment: any) => {
          totalScore += comment.score;
        });

        const average = parseFloat((totalScore / comments.length).toFixed(1));
        this.restaurantAverages[restaurant.id] = average;
      }
    });
  }

  addToFavorites(restaurantId: string): void {
    const userId = this.usuario.id;
    this.usersService.addToFavorites(userId, restaurantId).subscribe(
      (response: any) => {
        this.userFavorites.push(restaurantId);
        this.calculateAverages();
      },
      (error: any) => {
        console.error('Error al agregar el restaurante a favoritos', error);
      }
    );
  }

  deleteFromFavorites(restaurantId: string): void {
    const userId = this.usuario.id;
    this.usersService.deleteFromFavorites(userId, restaurantId).subscribe(
      (response: any) => {
        this.userFavorites = this.userFavorites.filter(id => id !== restaurantId);
        this.calculateAverages();
      },
      (error: any) => {
        console.error('Error al quitar el restaurante de favoritos', error);
      }
    );
  }
  isRestaurantFavorite(restaurantId: string): boolean {
    return this.userFavorites.includes(restaurantId);
  }
}
