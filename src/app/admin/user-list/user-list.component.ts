import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../shared/crud.service';  // CRUD API service class
import { Usuario } from '../../shared/usuario';   // Student interface class for Data types.
import { ToastrService } from 'ngx-toastr';      // Alert message using NGX toastr
import { AuthService } from './../../auth/auth.service';
import { Ubicacion } from '../../shared/ubicacion';
import { DownloadService } from '../../services/download.service';

@Component({
  selector: 'nm-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  p: number = 1;                      // Settup up pagination variable
  Usuario: Usuario[];     
  Ubicacion: Ubicacion[];            // Save students data in Student's array.
  hideWhenNoUsuario: boolean = false; // Hide students data table when no student.
  noData: boolean = false;            // Showing No Student Message, when no student in database.
  preLoader: boolean = true;   
  

  constructor(
    public crudApi: CrudService, // Inject student CRUD services in constructor.
    public toastr: ToastrService,
    public auth : AuthService,
    public download: DownloadService,
  ) { }

  ngOnInit() {
    this.dataState(); // Initialize student's list, when component is ready
    let s = this.crudApi.GetUsuariosList(); 
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Usuario = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        console.log(a);
        a['$key'] = item.key;
        let b = JSON.stringify(a);
        console.log(b);
        this.Usuario.push(a as Usuario);
        console.log(this.Usuario);
        
      })
    })
  }


  dataState() {     
    this.crudApi.GetUsuariosList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if(data.length <= 0){
        this.hideWhenNoUsuario = false;
        this.noData = true;
      } else {
        this.hideWhenNoUsuario = true;
        this.noData = false;
      }
    })
  }

  
  downloadUbiUser(usuario){
    if(window.confirm('Desea descargar estos datos?')){

      let b = this.crudApi.GetUbiUser(usuario.$key); 
      b.snapshotChanges().subscribe(data => { 
      this.Ubicacion = [];
      let c ={};
        data.forEach(item => {
        
        let a = item.payload.toJSON();
             
       
        
        a['$key'] = item.key;
        this.Ubicacion.push(a as Ubicacion);

               
        
         })
         
         this.download.downloadFile(this.Ubicacion,"ubicaciones");
         this.toastr.success('Haz descargado correctamente las ubicaciones de: ' + usuario.$key);
    })
      
    }
  }
  downloadCSVUbiUser(usuario){
    if(window.confirm('Desea descargar estos datos?')){

      let b = this.crudApi.GetUbiUser(usuario.$key); 
      b.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Ubicacion = [];
      let c ={};
        data.forEach(item => {
        
        let a = item.payload.toJSON();
        console.log(a);
     
       
        delete a['listaSatelite'];
        a['$key'] = item.key;
        console.log(a);
        this.Ubicacion.push(a as Ubicacion);

               
        
         })
         this.download.downloadCSVFile(this.Ubicacion, 'listaubicaciones');
         this.toastr.success('Haz descargado correctamente las ubicaciones de: ' + usuario.$key);
    })
      
    }

    
  }
  deleteUsuario(usuario) {
    if (window.confirm('Are sure you want to delete this student ?')) { // Asking from user before Deleting student data.
      this.crudApi.DeleteUsuario(usuario.$key) // Using Delete student API to delete student.
      this.toastr.success(usuario.email + ' successfully deleted!'); // Alert message will show up when student successfully deleted.
    }
  }
  deleteUbiUsuario(usuario) {
    if (window.confirm('Are sure you want to delete this student ?')) { // Asking from user before Deleting student data.
      this.crudApi.DeleteUbiUser(usuario.$key) // Using Delete student API to delete student.
      this.toastr.success(usuario.email + ' successfully deleted!'); // Alert message will show up when student successfully deleted.
    }
  }

}