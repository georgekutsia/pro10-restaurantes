import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantI, UserI } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ComentariosService } from 'src/app/shared/services/comentarios.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  usuario!: UserI;
  id!: string;
  favorite!: any;
  loaded:boolean = true;
  comments?: Comment[];
  favRests:boolean = true;
  favComments:boolean = false;

  constructor(
    private authUser: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private commentRoute: ComentariosService
  ) { }

  private formatDate(date: string): string {
    const formattedDate = format(new Date(date), 'dd/MM/yyyy HH:mm:ss');
    return formattedDate;
  }

  favRestTotggle(): void {
    this.favRests =false;
    this.favComments = true;
  }
  favComTotggle(): void {
    this.favRests =true;
    this.favComments = false;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = String(params.get('id'));
    })
    this.authUser.getUserById(this.id).subscribe((data: any) => {
      this.usuario = { ...data }
      this.favorite = this.usuario.favorite;
      this.usuario.createdAt = this.formatDate(this.usuario.createdAt);
      this.usuario.updatedAt = this.formatDate(this.usuario.updatedAt);
      this.loaded = false;
      if (this.usuario.comments && this.usuario.comments.length > 0) {
        this.usuario.comments.forEach((comentario: any) => {
          comentario.createdAt = this.formatDate(comentario.createdAt);
          comentario.updatedAt = this.formatDate(comentario.updatedAt);
        });
      }
    })
    const reloadFlag = localStorage.getItem('reloadFlag');
    if (reloadFlag === 'true') {
      localStorage.removeItem('reloadFlag');
      location.reload();
    }
  }
  
  deleteComment(commentId: string) {
    this.commentRoute.deleteComentario(commentId).subscribe(
      (data: any) => {
        this.usuario.comments = this.usuario.comments.filter(comentario => comentario.id !== commentId);
        console.log('Comentario eliminado exitosamente');
      },
      (error) => {
        console.error('Error al eliminar el comentario:', error);
      }
    );
  }
  
  deleteRest(restId: string) {
    const index = this.favorite.findIndex((fav: any) => fav.id === restId);

    if (index !== -1) {
      this.favorite.splice(index, 1);
      const updatedData = {
        favorite: this.favorite,
        name: this.usuario.name,
        age: this.usuario.age, 
      };

      this.authUser.updateUsuarios(this.id, updatedData).subscribe(
        (data: any) => {
          console.log('Restaurante eliminado de la lista de favoritos con éxito.');
        },
        (error) => {
          console.error('Error al eliminar el restaurante de la lista de favoritos:', error);
        }
      );
    }
  }

}
