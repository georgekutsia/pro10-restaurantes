import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestaurantI } from 'src/app/models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  id!: string;
  restaurant!: RestaurantI;
  // url: string = 'http://localhost:3333/restaurantes'
  url: string = 'https://api-restaurantes-7453rk2vs-georgekutsia.vercel.app/restaurantes'


  constructor(private http: HttpClient) {}

  getRestaurants(){
    return this.http.get(this.url)
  }

  getRestaurantById(id: string){
    return this.http.get(`${this.url}/${id}`)
  }

  postRestaurant(restaurant: RestaurantI){
    return this.http.post(this.url, restaurant)
  }

  putRestaurant(restaurant: RestaurantI, id: string){
    return this.http.put(`${this.url}/${id}`, restaurant)
  }

  deleteRestaurants(id: string){
    return this.http.delete(`${this.url}/${id}`)
  }

  setRestaurant(restaurant: RestaurantI, id: string){
    this.restaurant = {...restaurant};
    this.id = id
  }

  getRestaurant(){
    return this.restaurant;
  }

  getId(){
    return this.id;
  }


}
