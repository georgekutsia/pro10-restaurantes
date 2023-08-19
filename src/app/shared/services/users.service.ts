import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  id!: string;
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

}
