import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserI } from '../../models/interfaces'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  db_url: string = 'http://localhost:3333'
  constructor(private http: HttpClient) { }

  register(user: UserI){
    return this.http.post(`${this.db_url}/usuarios/register`, user)
  }
  login(user: UserI){
    return this.http.post(`${this.db_url}/usuarios/login`, user)
  }
}
