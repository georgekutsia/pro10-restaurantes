import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FoodI } from 'src/app/models/interfaces';
@Injectable({
  providedIn: 'root'
})
export class FoodService {

  id!: string;
  restaurant!: FoodI;
  url: string = 'http://localhost:3333/comidas'

  constructor(private http: HttpClient) { }

  getFoods() {
    return this.http.get(this.url)
  }

  getRestaurantById(id: string) {
    return this.http.get(`${this.url}/${id}`)
  }

  postRestaurant(restaurant: FoodI) {
    return this.http.post(this.url, restaurant)
  }

  putRestaurant(restaurant: FoodI, id: string) {
    return this.http.put(`${this.url}/${id}`, restaurant)
  }

  deleteComidas(id: string) {
    return this.http.delete(`${this.url}/${id}`)
  }

  setRestaurant(restaurant: FoodI, id: string) {
    this.restaurant = { ...restaurant };
    this.id = id
  }

  getRestaurant() {
    return this.restaurant;
  }

  getId() {
    return this.id;
  }

}
