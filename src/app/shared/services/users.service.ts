import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  id!: string;
  url: string = 'http://localhost:3333/usuarios'
  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get(this.url)
  }

  deleteUsers(id: string){
    return this.http.delete(`${this.url}/${id}`)
  }
}
