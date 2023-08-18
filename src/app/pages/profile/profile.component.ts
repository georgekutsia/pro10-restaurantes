import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  usuario: any; // Puedes definir una propiedad para almacenar los datos del usuario

  constructor() { }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('user') || '{}')
    console.log(this.usuario)
  }
}
