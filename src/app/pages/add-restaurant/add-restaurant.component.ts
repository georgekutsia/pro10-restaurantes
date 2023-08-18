import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantI } from 'src/app/models/interfaces';
import { RestaurantsService } from 'src/app/shared/services/restaurants.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.scss']
})
export class AddRestaurantComponent implements OnInit{
  restForm!: FormGroup;
  restaurant!: RestaurantI;
  submited: boolean = false;

  constructor(private form: FormBuilder, private restApi: RestaurantsService, private router: Router){}

  ngOnInit(): void {
    this.restForm = this.form.group({
      name: ["", Validators.required],
      img: ["", Validators.required],
      description: ["", Validators.required],
      city: ["", Validators.required],
      score: ["", Validators.required]
    })

    this.restForm.valueChanges.subscribe((data) => {
        this.restaurant = {...data}
      })
  }

  addRestaurant(){
    this.submited = true;
    if(this.restForm.valid){
      this.submited = false;
      this.restApi.postRestaurant(this.restaurant).subscribe((data) => {
        console.log(data);
        alert('Restaurante añadido correctamente')
        this.restForm.reset();
        this.router.navigate(['/restaurants'])
      })
    }
  }
}
