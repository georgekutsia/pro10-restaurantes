import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router'
import { UserI } from 'src/app/models/interfaces';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  usuario!: UserI; 
  isActive:boolean=false;
  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('user') || '{}');
    this.userService.userUpdated$.subscribe(user => {
      this.usuario = user;
    });
  }
  toggleButton() {
    this.isActive = !this.isActive;
  }
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.userService.updateUser({});
    this.router.navigate(['/']);
  }



  botonesActivados:any = {
    inicio: false,
    restaurantes: false,
    miembros: false
  };

  toggleShadow(button: string) {
    for (const key in this.botonesActivados) {
      this.botonesActivados[key] = false;
    }
    this.botonesActivados[button] = true;
  }
}
