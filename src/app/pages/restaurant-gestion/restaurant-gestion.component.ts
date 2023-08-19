import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from 'src/app/shared/services/restaurants.service';
import { RestaurantI } from 'src/app/models/interfaces';

@Component({
  selector: 'app-restaurant-gestion',
  templateUrl: './restaurant-gestion.component.html',
  styleUrls: ['./restaurant-gestion.component.scss']
})
export class RestaurantGestionComponent implements OnInit{

  id!: string;
  restaurant!: RestaurantI;
  constructor(private restApi: RestaurantsService, private activatedRoute: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = String(params.get('id'));
    })

    this.restApi.getRestaurantById(this.id).subscribe((data:any) => {
      this.restaurant = {...data}
    })
  }

  edit(){
    this.restApi.setRestaurant(this.restaurant, this.id);
    this.router.navigate(['/restaurants/edit'])
  }

    delete(){
    this.restApi.deleteRestaurants(this.id).subscribe((data) => {
      alert("Restaurante eliminado");
      console.log("Restaurante eliminado", data);
      this.router.navigate(["/restaurants"])
    })
  }
}
