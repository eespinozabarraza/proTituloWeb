import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'nm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private router: Router, 
    private authService: AuthService,
    private builder: FormBuilder) {
      this.registerForm = this.builder.group({
        email:['', Validators.compose([Validators.email, Validators.required])],
        password:['',Validators.required]
      })}

  ngOnInit() {
  }
  onAddUser(values){
    this.authService.registerUser(values.email, values.password)
    .then((res)=>{
      this.router.navigate(['admin/user_list']);
    }).catch(err=>console.log('err', err.message));

  }
}
