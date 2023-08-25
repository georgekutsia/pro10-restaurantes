import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComentariosService } from 'src/app/shared/services/comentarios.service';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.scss']
})
export class CommentEditComponent implements OnInit {
  id!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private commentService: ComentariosService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }

  delete() {
    this.commentService.deleteComentario(this.id).subscribe(
      (data) => {
        alert('Comentario eliminado');
        console.log('Comentario eliminado', data);
        // Redirige a donde desees después de eliminar el comentario
        this.router.navigate(['/restaurants']);
      },
      (error) => {
        console.error('Error al eliminar el comentario', error);
        // Maneja errores aquí si es necesario
      }
    );
  }
}
