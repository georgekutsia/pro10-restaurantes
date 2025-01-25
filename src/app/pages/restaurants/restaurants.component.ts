import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantI , UserI, FoodI} from 'src/app/models/interfaces';
import { RestaurantsService } from 'src/app/shared/services/restaurants.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FoodService } from 'src/app/shared/services/foods.service';

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
  userId!: string;
  usuarioData!: UserI;
  isFavorite: boolean = false;
  restaurantAverages: { [key: string]: number } = {};
  userFavorites: string[] = [];
  // userFavorites1:any[] = [];
  loaded: boolean = true;
  currentSlideIndex: number = 0;
  foods!: FoodI[];

  constructor(
    private restApi: RestaurantsService,
    private usersService: UsersService,
    private authService: AuthService,
    private foodService: FoodService,
  ) { }

  ngOnInit(): void {
    this.restApi.getRestaurants().subscribe((data: any) => {
      this.restList = [...data];
      this.usuario = JSON.parse(localStorage.getItem('user') || '{}');
      this.userId = this.usuario.id;
      this.authService.getUserById(this.userId).subscribe((data: any) => {
        this.usuarioData = {...data};
        this.userFavorites = this.usuarioData.favorite || [];
        
      })
      this.calculateAverages();
      this.loaded = false;
      console.log("bulala")
    });


    setInterval(() => {
      this.showNextSlide();
    }, 5000);
    this.foodService.getFoods().subscribe((data: any) => {
      this.foods = Object.values(data);
    })
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
    this.usersService.deleteFromFavorites(this.userId, restaurantId).subscribe(
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
  
  // isRestaurantFavorite1(restaurantId: string): boolean {
  //   return this.userFavorites1.some(item => item._id === restaurantId);
  // }

  
  changeSlide(index: number) {
    this.currentSlideIndex = index;
  }
  showNextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.foods.length;
  }
  showPreviousSlide() {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.foods.length) % this.foods.length;
  }
}
