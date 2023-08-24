import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantI } from 'src/app/models/interfaces';
import { RestaurantsService } from 'src/app/shared/services/restaurants.service';
import { UserI } from 'src/app/models/interfaces';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.scss']
})
export class EditRestaurantComponent implements OnInit{
  id!: string;
  restaurant!: RestaurantI;
  restForm!: FormGroup;
  submited: boolean = false;
  usuario!: UserI;

  constructor(private restApi: RestaurantsService, private form: FormBuilder, private router: Router){
    this.restaurant = {...this.restApi.getRestaurant()};
    this.id = this.restApi.getId();

  }

  ngOnInit(): void {
    this.restForm = this.form.group({
      name: [this.restaurant.name,],
      img: [this.restaurant.img,],
      description: [this.restaurant.description,],
      city: [this.restaurant.city,],
      score: [this.restaurant.score,],
      address: [this.restaurant.address,],
      phone: [this.restaurant.phone,],
      hours: [this.restaurant.hours,],
      coments:[this.restaurant.comments],
    })
    this.usuario = JSON.parse(localStorage.getItem('user') || '{}');
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
        alert('Cambios guardados correctamente')
        this.restForm.reset();
        this.router.navigate(['/restaurants'])
      })
    }
  }
}
