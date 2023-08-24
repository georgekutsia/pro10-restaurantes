import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommentI, RestaurantI } from 'src/app/models/interfaces';
import { RestaurantsService } from 'src/app/shared/services/restaurants.service';
import { ActivatedRoute } from '@angular/router';
import { ComentariosService } from 'src/app/shared/services/comentarios.service';
import { format } from 'date-fns';



@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  restId!: string;
  usersId!: any;
  patata!: any;
  submited: boolean = false;
  restForm!: FormGroup;
  restaurant!: RestaurantI;
  averageRating: number | undefined;
  comments: CommentI = {
    id:"",
    userId: '', 
    score: 0,
    comments: '',
    updatedAt: '',
    createdAt: ''
  };

  constructor(private restApi: RestaurantsService, public form: FormBuilder, private router: Router, private activeRoute: ActivatedRoute, private comentariosService: ComentariosService) {

  }
  private formatDate(date: string): string {
    const formattedDate = format(new Date(date), 'dd/MM/yyyy');
    return formattedDate;
  }
  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      const id = params['id'];
      console.log('ID de los parámetros:', id);
      this.restId = id;
      console.log("restId ahora si que si", this.restId);

      this.patata = JSON.parse(localStorage.getItem('user') || '{}');
      this.usersId = this.patata.id;
      console.log("patataid", this.usersId);

      this.comments = {
        userId: this.usersId,
        score: 0,
        comments: '',
        updatedAt: '',
        createdAt: '',
        id: ""
      };

      this.restApi.getRestaurantById(this.restId).subscribe((data: any) => {
        this.restaurant = { ...data }
        this.restaurant.createdAt = this.formatDate(this.restaurant.createdAt);
        this.restaurant.updatedAt = this.formatDate(this.restaurant.updatedAt);
        if (this.restaurant.comments && this.restaurant.comments.length > 0) {
          const totalRating = this.restaurant.comments.reduce((acc: number, comentario: any) => acc + comentario.score, 0);
          this.averageRating = parseFloat((totalRating / this.restaurant.comments.length).toFixed(1));
        }
        if (this.restaurant.comments && this.restaurant.comments.length > 0) {
          console.log("aaaver", this.restaurant.comments)
          this.restaurant.comments.forEach((comentario: any) => {
            comentario.createdAt = this.formatDate(comentario.createdAt);
            comentario.updatedAt = this.formatDate(comentario.updatedAt);
          });
          console.log("bulaaala",this.restaurant)
        }

        if (this.restaurant.comments && this.restaurant.comments.length > 0) {
          this.restaurant.comments = this.sortNewFirst(this.restaurant.comments);
          console.log(this.restaurant.comments);
        }
      });
    });

    this.restForm = this.form.group({
      userId: [this.usersId, Validators.required],
      score: [1, [Validators.required, Validators.min(1), Validators.max(10)]], // Establece 1 como valor predeterminado
      comments: ['', Validators.required],
    });

    this.restForm.valueChanges.subscribe((data) => {
      this.comments = { ...data };
    });
  }

  sortNewFirst(comments: CommentI[]): CommentI[] {
    return comments.slice().sort((a, b) => {
      const dateA = new Date(a.updatedAt);
      const dateB = new Date(b.updatedAt);

      if (isNaN(dateA.getTime())) {
      }
      if (isNaN(dateB.getTime())) {
        return -1; 
      }

      return dateB.getTime() - dateA.getTime();
    });
  }
  deleteComment(commentId: string) {
    this.comentariosService.deleteComentario(commentId).subscribe(
      (data: any) => {
        this.restaurant.comments = this.restaurant.comments.filter(comentario => comentario.id !== commentId);
        console.log('Comentario eliminado exitosamente');
      },
      (error) => {
        console.error('Error al eliminar el comentario:', error);
      }
    );
  }

  submitComment() {
    if (this.restForm.valid) {
      const comentarioData = {
        userId: this.comments.userId,
        score: this.comments.score,
        comments: this.comments.comments
      };

      this.comentariosService.enviarComentario(this.restId, comentarioData).subscribe(
        (response: any) => {
          location.reload();
        },
        (error) => {
          console.error('Error al enviar el comentario:', error);
        }
      );
    } else {
      this.submited = true;
    }
  }

  }
