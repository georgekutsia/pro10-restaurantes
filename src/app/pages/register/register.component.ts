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
  defaultImg: string = "https://res.cloudinary.com/dxnzcewsy/image/upload/v1692581180/restaurantes%20y%20usuarios/otras/pngwing.com_30_b3rztq.png"
  constructor(private form: FormBuilder, private api: AuthService, private router: Router){}
    ngOnInit(): void{
      this.registerForm = this.form.group({
        email: ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&`*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*")]],
        password: ["", [Validators.required]],
        name: ["", [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.minLength(1), Validators.maxLength(30)]],
        age: ["", [Validators.required, Validators.min(18)]],
        img: ["",]
      })
  
  }
  registrar(){
    this.submited = true;
    if(this.registerForm.valid){
      console.log(this.registerForm.value)
      if (!this.registerForm.get('img')?.value) {
        this.registerForm.get('img')?.setValue(this.defaultImg);
      }
      this.api.register(this.registerForm.value).subscribe((data) => {
        console.log(data);
        this.router.navigate(['/login'])
      },
     )
    }
  }
}
