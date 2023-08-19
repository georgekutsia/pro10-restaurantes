import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  usuario: any; 
  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('user') || '{}');
    this.userService.userUpdated$.subscribe(user => {
      console.log('User updated:', user);
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
