import { UsersService } from 'src/app/shared/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from 'src/app/shared/services/restaurants.service';
import { RestaurantI } from 'src/app/models/interfaces';
import { UserI } from 'src/app/models/interfaces';
import { format } from 'date-fns';

@Component({
  selector: 'app-restaurant-gestion',
  templateUrl: './restaurant-gestion.component.html',
  styleUrls: ['./restaurant-gestion.component.scss']
})
export class RestaurantGestionComponent implements OnInit {

  id!: string;
  restaurant!: RestaurantI;
  usuario!: UserI;
  averageRating: number | undefined;
  constructor(
    private restApi: RestaurantsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private usersService: UsersService 
  ) { }

  private formatDate(date: string): string {
    const formattedDate = format(new Date(date), 'dd/MM/yyyy');
    return formattedDate;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = String(params.get('id'));
      this.usuario = JSON.parse(localStorage.getItem('user') || '{}');
    })

    this.restApi.getRestaurantById(this.id).subscribe((data: any) => {
      this.restaurant = { ...data }
      this.restaurant.createdAt = this.formatDate(this.restaurant.createdAt);
      this.restaurant.updatedAt = this.formatDate(this.restaurant.updatedAt);
      if (this.restaurant.comments && this.restaurant.comments.length > 0) {
        const totalRating = this.restaurant.comments.reduce((acc: number, comentario: any) => acc + comentario.score, 0);
        this.averageRating = totalRating / this.restaurant.comments.length;
      }
      if (this.restaurant.comments && this.restaurant.comments.length > 0) {
        this.restaurant.comments.forEach((comentario: any) => {
          comentario.createdAt = this.formatDate(comentario.createdAt);
          comentario.updatedAt = this.formatDate(comentario.updatedAt);
        });
      }
    })
  }

  addToFavorites() {
    const userId = this.usuario.id;
    const restaurantId = this.id; 

    this.usersService.addToFavorites(userId, restaurantId).subscribe(
      (response:any) => {
        console.log('Restaurante agregado a favoritos', response);
      },
      (error:any) => {
        console.error('Error al agregar el restaurante a favoritos', error);
      }
    );
  }

  edit() {
    this.restApi.setRestaurant(this.restaurant, this.id);
    this.router.navigate(['/restaurants/edit'])
  }

  delete() {
    this.restApi.deleteRestaurants(this.id).subscribe((data) => {
      alert("Restaurante eliminado");
      console.log("Restaurante eliminado", data);
      this.router.navigate(["/restaurants"])
    })
  }
}
