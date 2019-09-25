import { UserInterface } from './user';
import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import { Ubicacion } from '../shared/Ubicacion';
import {AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';



@Injectable({
  providedIn: 'root'
})

export class CrudService {
  eventsRef: AngularFireList<any>; //Referencia a la lista de datos del usuario, es un observable.
  eventRef: AngularFireObject<any>; //Al igual que el anterior referenca al objeto usuario.
  constructor(private db:AngularFireDatabase) { }

  GetUbicacion(id:string){
    this.eventRef = this.db.object('Ubicaciones/'+ id);
    return this.eventRef;
  }

 GetUbicacionList(){
    this.eventsRef=this.db.list('Ubicaciones');
    return this.eventsRef;

  }

  DeleteUbicacion(id:string){
    this.eventRef=this.db.object('Ubicaciones/' + id);
    this.eventRef.remove();
  }

  GetUbiUser(id:string){
    this.eventsRef = this.db.list('Ubi-por-usuario/' + id );
    return this.eventsRef;
  }

 GetUbiUserList(){
    this.eventsRef=this.db.list('Ubi-por-usuario');
    return this.eventsRef;

  }

  DeleteUbiUser(id:string){
    this.eventRef=this.db.object('Ubi-por-usuario/' + id );
    this.eventRef.remove();
  }

  AddUser(user:User){
    this.eventsRef.push({
      firstName: user.firstName,
      lastName: user.lastName,
      email:user.email,
      mobileNumber: user.mobileNumber
    })
  }
  AddUsuario(usuario:UserInterface){
    this.eventsRef.push({
      $key: usuario.id,
      email: usuario.email,
      type: usuario.tipo ="alumno"
      
    })
  }
  GetUser(id:string){
    this.eventRef = this.db.object('users-list/' + id);
    return this.eventRef;
  }
  
  GetUsersList(){
    this.eventsRef=this.db.list('users-list');
    return this.eventsRef;
  }

  UpdateUser(user:User){
    this.eventRef.update({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobileNumber: user.mobileNumber
    })
  }

  DeleteUser(id:string){
    this.eventRef=this.db.object('users-list/' + id);
    this.eventRef.remove();
  }

  GetUsuario(id:string){
    this.eventRef = this.db.object('Usuarios' + id);
    return this.eventRef;
  }
  GetUsuariosList(){
    this.eventsRef=this.db.list('Usuarios');
    return this.eventsRef;
    
  }

  UpdateUsuario(usuario:UserInterface){
    this.eventRef.update({
      $key: usuario.id,
      email: usuario.email,
      type: usuario.tipo
      
    })
  }

  DeleteUsuario(id:string){
    this.eventRef=this.db.object('Usuarios/' + id);
    this.eventRef.remove();
  }  
}
