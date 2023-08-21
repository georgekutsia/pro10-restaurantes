import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { UserI } from 'src/app/models/interfaces';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  id!: string;
  user!: UserI;
  url: string = 'http://localhost:3333/usuarios'
  constructor(private http: HttpClient) { }
  private userUpdated = new Subject<any>();

  userUpdated$ = this.userUpdated.asObservable();

  updateUser(user: any) {
    this.userUpdated.next(user);
  }

  getUsers(){
    return this.http.get(this.url)
  }

  deleteUsers(id: string){
    return this.http.delete(`${this.url}/${id}`)
  }

  putUsers(user: UserI, id: string){
    return this.http.put(`${this.url}/${id}`, user)
  }

  addToFavorites(userId: string, restaurantId: string) {
    return this.http.post(`${this.url}/${restaurantId}/favorites`, { userId });
  }
  deleteFromFavorites(userId: string, restaurantId: string) {
    const options = {
      headers: { 'Content-Type': 'application/json' },
      body: {
        userId: userId,
      },
    };

    return this.http.delete(`${this.url}/${restaurantId}/favorites`, options);
  }

}
