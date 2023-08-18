import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantI } from 'src/app/models/interfaces';
import { RestaurantsService } from 'src/app/shared/services/restaurants.service';

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

  constructor(private restApi: RestaurantsService, private form: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute){
    this.restaurant = {...this.restApi.getRestaurant()};
    this.id = this.restApi.getId();
  }

 ngOnInit(): void {

    this.restForm = this.form.group({
      name: [this.restaurant.name, Validators.required],
      img: [this.restaurant.img, Validators.required],
      description: [this.restaurant.description, Validators.required],
      city: [this.restaurant.city, Validators.required],
      score: [this.restaurant.score, Validators.required]
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
        this.router.navigate(['/restaurants'])
      })
    }
  }
}
