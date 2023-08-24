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
  defaultImg: string = "https://res.cloudinary.com/dxnzcewsy/image/upload/v1692841067/restaurantes%20y%20usuarios/42004148-vaciar-el-tablero-del-menu%CC%81-al-texto-del-anuncio-con-las-sillas-apiladas-del-cafe%CC%81-en-fondo_rhvdkb.jpg"
  constructor(private form: FormBuilder, private restApi: RestaurantsService, private router: Router){}

  ngOnInit(): void {
    this.restForm = this.form.group({
      name: ["", Validators.required],
      img: [""],
      description: ["", Validators.required],
      city: ["", Validators.required],
      address: ["", Validators.required],
      hours: ["", Validators.required],
      phone: ["", Validators.required],
      comments:"64e2c48de160ac8eead07ca0"
    })

    this.restForm.valueChanges.subscribe((data) => {
        this.restaurant = {...data}
      })
  }

  addRestaurant(){
    this.submited = true;
    if(this.restForm.valid){
      if (!this.restForm.get('img')?.value) {
        this.restForm.get('img')?.setValue(this.defaultImg);
      }
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
