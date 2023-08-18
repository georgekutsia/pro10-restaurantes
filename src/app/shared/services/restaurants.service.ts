import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestaurantI } from 'src/app/models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  id!: string;
  restaurant!: RestaurantI;
  url: string = 'http://localhost:3333/restaurantes'

  constructor(private http: HttpClient) {}

  getRestaurants(){
    return this.http.get(this.url)
  }

  putRestaurant(restaurant: RestaurantI, id: string){
    return this.http.put(`${this.url}/${id}`, restaurant)
  }

  setRestaurant(restaurant: RestaurantI, id: string){
    this.restaurant = {...restaurant}
    this.id = id;
  }

  deleteRestaurants(id: string){
    return this.http.delete(`${this.url}/${id}`)
  }

  getRest(){
    return this.restaurant;
  }

  getId(){
    return this.id; 
  }
}
