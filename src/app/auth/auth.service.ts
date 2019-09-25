import { Injectable } from '@angular/core';

import { Router } from  "@angular/router";
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;

  constructor(public  afAuth:  AngularFireAuth, public  router:  Router, private location: Location) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
   }
   async registerUser(email: string, password: string) {
     try {
       await  this.afAuth.auth.createUserWithEmailAndPassword(email, password);
       this.router.navigate(['admin/list']);
      } catch (e) {
        alert("Error!"  +  e.message);
      }
    }
   async login(email:  string, password:  string) {
     try {
       await  this.afAuth.auth.signInWithEmailAndPassword(email, password);
       this.router.navigate(['admin/list']);
      } catch (e) {
        alert("Error!"  +  e.message);
      }
    }

    async logout(){
      await this.afAuth.auth.signOut();
      
      this.onLogoutRedirect();
      localStorage.removeItem('user');
  }

  get isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
}

onLogoutRedirect():void{
  this.router.navigate(['admin/login']);
}

downloadFile(data, filename='data') {
  let Data = JSON.stringify(data);
  console.log(Data)
  let blob = new Blob(['\ufeff' + Data], { type: 'text/csv;charset=utf-8;' });
  let dwldLink = document.createElement("a");
  let url = URL.createObjectURL(blob);
  let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
  if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
  }
  dwldLink.setAttribute("href", url);
  dwldLink.setAttribute("download", filename + ".json");
  dwldLink.style.visibility = "hidden";
  document.body.appendChild(dwldLink);
  dwldLink.click();
  document.body.removeChild(dwldLink);
}


}
