import { MustMatch } from './../../shared/must-match.validator';
import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../../shared/crud.service';    // CRUD services API
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'nm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  
  
  constructor(
    public toastr: ToastrService,
    public crudApi: CrudService,
    private router: Router, 
    private authService: AuthService,
    private builder: FormBuilder) {}

  ngOnInit() {
    this.crudApi.GetUsuariosList();
    this.registerForm = this.builder.group({
      email:['',[Validators.email, Validators.required]],
      password:['',[Validators.required, Validators.minLength(6)]],
      confirmPassword: ['',Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    },{ validator: MustMatch('password', 'confirmPassword')
  });
  }
  get f(){ return this.registerForm.controls;}

  get email() {
    return this.registerForm.get('email');
  }
  onAddUser(values):void{
    this.submitted=true;
    if(this.registerForm.valid){
      this.authService.registerUser(values.email, values.password);
      this.crudApi.AddUsuario(this.email.value);
      this.toastr.success(this.registerForm.controls['email'].value + ' successfully added!');
      
    }else{
      return;
      
    }
    

  }
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
}
}
