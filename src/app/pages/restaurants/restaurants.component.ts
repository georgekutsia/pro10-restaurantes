import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantI } from 'src/app/models/interfaces';
import { UserI } from 'src/app/models/interfaces';
import { RestaurantsService } from 'src/app/shared/services/restaurants.service';

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
  restaurantAverages: { [key: string]: number } = {};

  constructor(private restApi: RestaurantsService, private router: Router) { }

  ngOnInit(): void {
    this.restApi.getRestaurants().subscribe((data: any) => {
      this.restList = [...data];
      this.usuario = JSON.parse(localStorage.getItem('user') || '{}');
      this.calculateAverages();
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

        const average = totalScore / comments.length;
        this.restaurantAverages[restaurant.id] = average;
      }
    });
  }
}
