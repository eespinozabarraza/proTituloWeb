import { Component, OnInit } from '@angular/core';
import { AuthService } from  'src/app/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'nm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    public afAuth: AngularFireAuth, 
    private router: Router, 
    private  authService:  AuthService, 
    private builder: FormBuilder) {
      this.loginForm = this.builder.group({
        email:['', Validators.compose([Validators.email, Validators.required])],
        password:['',Validators.required]
      })
    }
  
  ngOnInit() {
  }
  onLogin(values):void {
   //console.log('email', this.email);
    //console.log('password', this.password)
    this.authService.login(values.email, values.password);
    
    };

   
    onLoginRedirect(): void {
      this.router.navigate(['admin/user-list']);
    }
  
  

}
