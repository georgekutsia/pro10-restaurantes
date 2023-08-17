import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  id!: string;
  url: string = 'http://localhost:3333/restaurantes'

  constructor(private http: HttpClient) {}

  getRestaurants(){
    return this.http.get(this.url)
  }

  deleteRestaurants(id: string){
    return this.http.delete(`${this.url}/${id}`)
  }
}
