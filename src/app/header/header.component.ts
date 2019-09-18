import { Component, OnInit } from '@angular/core';
import { AuthService } from  'src/app/auth/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'nm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private  authService:  AuthService, private location: Location) { }
  public nm_name: string = 'MoviTrackyCP';
  public isLogged: boolean = false;

  ngOnInit() {
    this.onCheckUser();
    
  }
  onLogout():void{
    this.authService.logout();
    location.reload();
  }
  onCheckUser():void{
    if(this.authService.isLoggedIn){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
  }

}
