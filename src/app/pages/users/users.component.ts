import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserI } from 'src/app/models/interfaces';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  
  id!: string;
  userList!: UserI[];
 
  constructor(private userApi: UsersService, private router: Router) {}
 
  ngOnInit(): void{
    this.userApi.getUsers().subscribe((data: any) => {
     this.userList = [...data]
    })
  }

  deleteUser(id: string){
    this.userApi.deleteUsers(id).subscribe((data) => {
      alert("Usuario eliminado");
      console.log("Usuario eliminado", data);
      this.router.navigate(["/users"])
    })
  }
 }
