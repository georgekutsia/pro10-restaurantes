import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private restApi: RestaurantsService, private form: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      this.id = String(params.get('id'))
    })

    this.restApi.getRestaurantById(this.id).subscribe((data:any) => {
      this.restaurant = {...data}
    })

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
