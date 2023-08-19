import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantI, UserI } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  usuario!: UserI; 
  id!: string;
  favorite!: any;
  constructor(private authUser: AuthService, private activatedRoute: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = String(params.get('id'));
    })
    this.authUser.getUserById(this.id).subscribe((data: any) => {
      this.usuario = { ...data }
      this.favorite = this.usuario.favorite;
      console.log("eeee", this.usuario)
    })
    // this.usuario = JSON.parse(localStorage.getItem('user') || '{}');
    const reloadFlag = localStorage.getItem('reloadFlag');
    if (reloadFlag === 'true') {
      localStorage.removeItem('reloadFlag'); 
      location.reload();
    }
    console.log()
  }

  
}
