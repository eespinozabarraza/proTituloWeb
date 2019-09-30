import { Component, OnInit } from '@angular/core';
import { AuthService } from  'src/app/auth/auth.service';


@Component({
  selector: 'nm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public  authService:  AuthService) { }
  public nm_name: string = 'MoviTrackyCP';
  

  ngOnInit() {  
  }
  onLogout():void{
    this.authService.logout();
    
  }
  
    
  

}
