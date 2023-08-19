import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  usuario: any; 

  constructor() { }
  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('user') || '{}');
    const reloadFlag = localStorage.getItem('reloadFlag');
    if (reloadFlag === 'true') {
      localStorage.removeItem('reloadFlag'); 
      location.reload();
    }
    console.log(this.usuario)
  }

  
}
