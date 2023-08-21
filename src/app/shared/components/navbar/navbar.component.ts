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
  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('user') || '{}');
    this.userService.userUpdated$.subscribe(user => {
      this.usuario = user;
    });
  }
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.userService.updateUser({});
    this.router.navigate(['/']);
  }
}
