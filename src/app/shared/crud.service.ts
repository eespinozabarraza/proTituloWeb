import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import { Usuario } from '../shared/usuario';
import {AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  usersRef: AngularFireList<any>; //Referencia a la lista de datos del usuario, es un observable.
  userRef: AngularFireObject<any>; //Al igual que el anterior referenca al objeto usuario.
  constructor(private db:AngularFireDatabase) { }
  
  AddUser(user:User){
    this.usersRef.push({
      firstName: user.firstName,
      lastName: user.lastName,
      email:user.email,
      mobileNumber: user.mobileNumber
    })
  }
  AddUsuario(usuario:Usuario){
    this.usersRef.push({
      $key: usuario.$Userkey,
      eMail: usuario.email,
      
    })
  }
  GetUser(id:string){
    this.userRef = this.db.object('users-list/' + id);
    return this.userRef;
  }
  
  GetUsersList(){
    this.usersRef=this.db.list('users-list');
    return this.usersRef;
  }

  UpdateUser(user:User){
    this.userRef.update({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobileNumber: user.mobileNumber
    })
  }

  DeleteUser(id:string){
    this.userRef=this.db.object('users-list/' + id);
    this.userRef.remove();
  }

  GetUsuario(id:string){
    this.userRef = this.db.object('Usuarios' + id);
    return this.userRef;
  }
  GetUsuariosList(){
    this.usersRef=this.db.list('Usuarios');
    return this.usersRef;
    
  }

  UpdateUsuario(usuario:Usuario){
    this.userRef.update({
      $key: usuario.$Userkey,
      eMail: usuario.email,
      
    })
  }

  DeleteUsuario(id:string){
    this.userRef=this.db.object('Usuarios/' + id);
    this.userRef.remove();
  }  
}
