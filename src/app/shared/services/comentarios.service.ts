import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  // url: string = 'http://localhost:3333/comentarios'
  url: string = 'https://api-restaurantes-7453rk2vs-georgekutsia.vercel.app/comentarios'

  constructor(private http: HttpClient) { }

  enviarComentario(id: string, comentarioData: any): Observable<any> {
    const url = `${this.url}/${id}/userComment`;
    return this.http.post(url, comentarioData);
  }
  getRestaurantById(id: string) {
    return this.http.get(`${this.url}/${id}/userComment`)
  }
  deleteComentario(id: string) {
    return this.http.delete(`${this.url}/${id}`)
  }

}
