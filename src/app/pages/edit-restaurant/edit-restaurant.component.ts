import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantI } from 'src/app/models/interfaces';
import { RestaurantsService } from 'src/app/shared/services/restaurants.service';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.scss']
})
export class EditRestaurantComponent {
  id!: string;
  restaurant!: RestaurantI;
  restForm!: FormGroup;
  submited: boolean = false;

  constructor(private restApi: RestaurantsService, private form: FormBuilder, private router: Router){
    this.restaurant = {...this.restApi.getRest()}
    this.id = this.restApi.getId();
   }

  ngOnInit(): void {
    this.restForm = this.form.group({
      nombre: [this.restaurant.nombre, Validators.required],
      foto: [this.restaurant.foto, Validators.required],
      descripcion: [this.restaurant.descripcion, Validators.required],
      ciudad: [this.restaurant.ciudad, Validators.required],
      puntos: [this.restaurant.puntos, Validators.required]
    })

    this.restForm.valueChanges.subscribe((data) => {
      this.restaurant = {...data}
    })
  }

  editRestaurant(){
    this.submited = true;
    if(this.restForm.valid){
      this.submited = false;
      this.restApi.putRestaurant(this.restaurant, this.id).subscribe((data) => {
        console.log(data);
        this.restForm.reset();
        
        this.router.navigate(["/restaurants"])
      })
    }
  }
}
