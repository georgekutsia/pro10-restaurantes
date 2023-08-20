import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommentI, RestaurantI } from 'src/app/models/interfaces';
import { RestaurantsService } from 'src/app/shared/services/restaurants.service';
import { ActivatedRoute } from '@angular/router';
import { ComentariosService } from 'src/app/shared/services/comentarios.service';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  restId!: string;
  usersId!: any;
  id!: any;
  submitted: boolean = false;
  restForm!: FormGroup;
  restaurant!: RestaurantI;
  comments: CommentI = {
    userId: '',   // Se inicializa como cadena vacía
    score: 0,
    comments: ''
  };

  constructor(private restApi: RestaurantsService, private form: FormBuilder, private router: Router, private activeRoute: ActivatedRoute, private comentariosService: ComentariosService) {
    this.restaurant = { ...this.restApi.getRestaurant() };
    this.restId = this.restApi.getId();
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      const id = params['id'];
      console.log('ID de los parámetros:', id);

      this.id = JSON.parse(localStorage.getItem('user') || '{}');
      this.usersId = this.id.id;
      console.log(this.usersId);

      this.comments = {
        userId: this.usersId,
        score: 0,
        comments: ''
      };
    });

    this.restForm = this.form.group({
      userId: [this.comments.userId, Validators.required],
      score: [this.comments.score, Validators.required],
      comments: [this.comments.comments, Validators.required],
    });

    this.restForm.valueChanges.subscribe((data) => {
      this.comments = { ...data };
    });
    
  }
  submitComment() {
    if (this.restForm.valid) {
      const userId = this.comments.userId;
      const commentData = {
        score: this.comments.score,
        comments: this.comments.comments
      };

      this.comentariosService.enviarComentario(userId, commentData).subscribe(
        (response: any) => {
          console.log('Comentario enviado con éxito:', response);
          this.router.navigate(['/restaurantes', this.restId]);
        },
        (error) => {
          console.error('Error al enviar el comentario:', error);
        }
      );
    } else {
      this.submitted = true;
    }
  }

  }
