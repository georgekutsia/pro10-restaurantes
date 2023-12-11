import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FoodI } from 'src/app/models/interfaces';
@Injectable({
  providedIn: 'root'
})
export class FoodService {

  id!: string;
  restaurant!: FoodI;
  // url: string = 'http://localhost:3333/comidas'
  url: string = 'https://api-restaurantes-7453rk2vs-georgekutsia.vercel.app/comidas'


  constructor(private http: HttpClient) { }

  getFoods() {
    return this.http.get(this.url)
  }

  getFoodById(id: string) {
    return this.http.get(`${this.url}/${id}`)
  }

  postFood(restaurant: FoodI) {
    return this.http.post(this.url, restaurant)
  }

  putFood(restaurant: FoodI, id: string) {
    return this.http.put(`${this.url}/${id}`, restaurant)
  }

  deleteFood(id: string) {
    return this.http.delete(`${this.url}/${id}`)
  }

  setRestaurant(restaurant: FoodI, id: string) {
    this.restaurant = { ...restaurant };
    this.id = id
  }

  getFood() {
    return this.restaurant;
  }

  getId() {
    return this.id;
  }

}
