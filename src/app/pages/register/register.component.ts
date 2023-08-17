import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;
  submited: boolean = false;
  constructor(private form:     FormBuilder, private api: AuthService, private router: Router){}
    ngOnInit(): void{
      this.registerForm = this.form.group({
        email: ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&`*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*")]],
        password: [""]
      })
  
  }
  registrar(){
    this.submited = true;
    if(this.registerForm.valid){
      console.log("nombre1",this.registerForm.value)
      this.api.register(this.registerForm.value).subscribe((data) => {
        console.log("nombre2",data);
        this.router.navigate(['/login'])
      })
    }
  }
}
