import { Component, OnInit, Renderer2, ElementRef, HostListener } from '@angular/core';
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


  constructor(private userService: UsersService, private router: Router, private renderer: Renderer2, private el: ElementRef) { }

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

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    const scrollY = window.scrollY;
    const mainnavbarElements = this.el.nativeElement.getElementsByClassName('mainnavbar');
    const navbarElements = document.querySelector('.navBar');

    if (mainnavbarElements.length > 0) {
      const mainnavbarElement = mainnavbarElements[0];
      const mainnavbarOffset = mainnavbarElement.offsetTop;

      if (scrollY > mainnavbarOffset) {
        this.renderer.setStyle(mainnavbarElement, 'position', 'fixed');
        this.renderer.setStyle(mainnavbarElement, 'top', '0');
        this.renderer.setStyle(mainnavbarElement, 'zIndex', '40');
        this.renderer.setStyle(mainnavbarElement, 'backgroundColor', '#2c7044');
        this.renderer.setStyle(mainnavbarElement, 'width', '100%');
        this.renderer.setStyle(mainnavbarElement, 'borderRadius', '0px');
      } else {
        this.renderer.removeStyle(mainnavbarElement, 'position');
        this.renderer.removeStyle(mainnavbarElement, 'top');
        this.renderer.removeStyle(mainnavbarElement, 'backgroundColor');
        this.renderer.removeStyle(mainnavbarElement, 'width');
      }

      if (scrollY < 200) { 
        this.renderer.removeStyle(mainnavbarElement, 'position');
        this.renderer.removeStyle(mainnavbarElement, 'top');
        this.renderer.removeStyle(mainnavbarElement, 'backgroundColor');
        this.renderer.removeStyle(mainnavbarElement, 'width');
        this.renderer.removeStyle(navbarElements, 'borderRadius');
        this.renderer.removeStyle(navbarElements, 'backgroundColor');
      }
    }
  }



}
