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
  registered: boolean = false;
  regCorrect: boolean = false;
  registerError:boolean = false;
  showPass = 'password';
  defaultImg: string = "https://res.cloudinary.com/dxnzcewsy/image/upload/v1692581180/restaurantes%20y%20usuarios/otras/pngwing.com_30_b3rztq.png"

  constructor(private form: FormBuilder, private api: AuthService, private router: Router){}


    ngOnInit(): void{
      this.registerForm = this.form.group({
        email: ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&`*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*")]],
        password: ["", [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]],
        name: ["", [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.minLength(3), Validators.maxLength(30)]],
        age: ["", [Validators.required, Validators.min(18), Validators.max(300)]],
        img: ["",]
      })
  
  }
  togglePassword() {
    this.showPass = this.showPass === 'password' ? 'text' : 'password';
  }


  registrar(){
    this.regCorrect = true
    if(this.registerForm.valid){
      this.registered = true;
      if (!this.registerForm.get('img')?.value) {
        this.registerForm.get('img')?.setValue(this.defaultImg);
      }
      this.api.register(this.registerForm.value).subscribe((data) => {
        this.router.navigate(['/login'])
      },
      (error) => {
          console.log("sub", this.registered)
          this.registerError = true;
          this.registered = false;
        }
      )
    }
  }
}
