import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../shared/crud.service';  // CRUD API service class
import { Usuario } from '../../shared/usuario';   // Student interface class for Data types.
import { ToastrService } from 'ngx-toastr';      // Alert message using NGX toastr
import { Ubicacion } from '../../shared/ubicacion';


@Component({
  selector: 'nm-ubicacion-list',
  templateUrl: './ubicacion-list.component.html',
  styleUrls: ['./ubicacion-list.component.css']
})
export class UbicacionListComponent implements OnInit {
  p: number = 1;                      // Settup up pagination variable
  Ubicacion: Ubicacion[];                 // Save students data in Student's array.
  hideWhenNoUbicacion: boolean = false; // Hide students data table when no student.
  noData: boolean = false;            // Showing No Student Message, when no student in database.
  preLoader: boolean = true; 
  constructor(
    public crudApi: CrudService, // Inject student CRUD services in constructor.
    public toastr: ToastrService
  ) { }


  ngOnInit() {
    this.dataState(); // Initialize student's list, when component is ready
    let s = this.crudApi.GetUbiUserList(); 
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Ubicacion = [];
      data.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Ubicacion.push(a as Ubicacion);
        console.log(this.Ubicacion);
        
        
        
      })
    })
  }
  dataState() {     
    this.crudApi.GetUbiUserList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if(data.length <= 0){
        this.hideWhenNoUbicacion = false;
        this.noData = true;
      } else {
        this.hideWhenNoUbicacion = true;
        this.noData = false;
      }
    })
  }

  // Method to delete student object
  deleteUbiUser(ubicacion) {
    if (window.confirm('Are sure you want to delete this student ?')) { // Asking from user before Deleting student data.
      this.crudApi.DeleteUbiUser(ubicacion.$key) // Using Delete student API to delete student.
      this.toastr.success(ubicacion.$key + ' successfully deleted!'); // Alert message will show up when student successfully deleted.
    }
  }


}
