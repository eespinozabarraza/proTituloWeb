import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../shared/crud.service';  // CRUD API service class
import { Usuario } from '../../shared/usuario';   // Student interface class for Data types.
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'nm-usuario-lista',
  templateUrl: './usuario-lista.component.html',
  styleUrls: ['./usuario-lista.component.css']
})
export class UsuarioListaComponent implements OnInit {
    p: number = 1;                      // Settup up pagination variable
    Usuario: Usuario[];                 // Save students data in Student's array.
    hideWhenNoUsuario: boolean = false; // Hide students data table when no student.
    noData: boolean = false;            // Showing No Student Message, when no student in database.
    preLoader: boolean = true;   
  
    constructor(
      public crudApi: CrudService, // Inject student CRUD services in constructor.
      public toastr: ToastrService
    ) { }
  
    ngOnInit() {
      this.dataState(); // Initialize student's list, when component is ready
      let s = this.crudApi.GetUsuariosList(); 
      s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
        this.Usuario = [];
        data.forEach(item => {
          let a = item.payload.toJSON(); 
          a['$key'] = item.key;
          this.Usuario.push(a as Usuario);
        })
      })
    }
  
    // Using valueChanges() method to fetch simple list of students data. It updates the state of hideWhenNoStudent, noData & preLoader variables when any changes occurs in student data list in real-time.
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
  
    // Method to delete student object
    deleteUsuario(usuario) {
      if (window.confirm('Are sure you want to delete this student ?')) { // Asking from user before Deleting student data.
        this.crudApi.DeleteUsuario(usuario.$key) // Using Delete student API to delete student.
        this.toastr.success(usuario.email + ' successfully deleted!'); // Alert message will show up when student successfully deleted.
      }
    }
  
  }