import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantI } from 'src/app/models/interfaces';
import { RestaurantsService } from 'src/app/shared/services/restaurants.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit{
 
  id!: string;
  restaurant!: RestaurantI;
  restList!: RestaurantI[];

  constructor(private restApi: RestaurantsService, private router: Router) {}

  ngOnInit(): void{
    this.restApi.getRestaurants().subscribe((data: any) => {
      this.restList = [...data]
    })
  }

  edit(){
    this.restApi.setRestaurant(this.restaurant, this.id);
    this.router.navigate(['restaurants/edit']);
  }

  deleteRestaurant(id: string){
    this.restApi.deleteRestaurants(id).subscribe((data) => {
      alert("Restaurante eliminado");
      console.log("Restaurante eliminado", data);
      this.router.navigate(["/restaurants"])
    })
  }
}
