import { Component, OnInit } from '@angular/core';
import { AuthService } from  'src/app/auth/auth.service';

@Component({
  selector: 'nm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private  authService:  AuthService) { }

  ngOnInit() {
  }

}
