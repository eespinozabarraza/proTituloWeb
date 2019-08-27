import { Component, OnInit } from '@angular/core';
import { AuthService } from  'src/app/auth/auth.service';

@Component({
  selector: 'nm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private  authService:  AuthService) { }

  ngOnInit() {
  }

}
