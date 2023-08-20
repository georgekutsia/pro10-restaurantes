import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantI, UserI } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';
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
  
  constructor(private authUser: AuthService, private activatedRoute: ActivatedRoute, private router: Router) { }

  private formatDate(date: string): string {
    const formattedDate = format(new Date(date), 'dd/MM/yyyy HH:mm:ss');
    return formattedDate;
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
}
