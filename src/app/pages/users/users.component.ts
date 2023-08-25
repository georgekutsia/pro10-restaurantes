import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserI } from 'src/app/models/interfaces';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  id!: string;
  userList!: UserI[];
  loggedUser!: UserI;
  loaded: boolean = true;
  filterName: string = '';
  originalUserList!: UserI[];

  constructor(private userApi: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.userApi.getUsers().subscribe((data: any) => {
      this.userList = [...data]
      this.originalUserList = [...data]
      this.loaded = false
    })
    this.loggedUser = JSON.parse(localStorage.getItem('user')!)
  }

  deleteUser(id: string) {
    this.userApi.deleteUsers(id).subscribe((data) => {
      location.reload();
      alert("Usuario eliminado");
      this.router.navigate(["/users"])
    })
    this.filterName = '';
  }

  filterByName() {
    if (this.filterName.trim() !== '') {
      this.userList = this.userList.filter(user =>
        user.name.toLowerCase().includes(this.filterName.toLowerCase())
      );
    } else {
      this.userList = [...this.originalUserList];
    }
  }

  sortByComments() {
    this.userList.sort((a, b) => b.comments.length - a.comments.length);
  }

  sortByAge() {
    this.userList.sort((a, b) => b.age - a.age);
  }
}
