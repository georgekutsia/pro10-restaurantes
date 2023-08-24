import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; 
  submited: boolean = false;
  subCorrect:boolean = false;
  showPass:string = 'password';
  loginError:boolean = false;
  constructor(private form: FormBuilder, private api: AuthService, private router: Router){}

  ngOnInit(): void {
    this.loginForm = this.form.group({
      email: ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&`*+/=?^_`{|}~-]+[a-zA-ZñÑ0-9-]+(?:\.[a-zA-ZñÑ0-9-]+)*$")]],
      password: ["", [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]],
    })
  }

  togglePassword() {
    this.showPass = this.showPass === 'password' ? 'text' : 'password';
  }
  login() {
    this.subCorrect = true;
    if (this.loginForm.valid) {
    this.submited = true;
    this.api.login(this.loginForm.value).subscribe(
      (data: any) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.usuario));
        localStorage.setItem('reloadFlag', 'true');
        this.router.navigate([`/profile/${data.usuario.id}`]);
      },
      (error) => {
        console.error(error);
        this.submited = false;
        this.loginError = true;
      }
    );
  }
}
}
