import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';    // CRUD services API
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'nm-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
 public userForm : FormGroup;
  constructor(
    public crudApi: CrudService,
    public fb: FormBuilder,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
    this.crudApi.GetUsersList();
    this.usrForm();

  }
  usrForm(){
    this.userForm =this.fb.group({
      firstName:['',[Validators.required, Validators.minLength(2)]],
      lastName:[''],
      email:['',[Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }
  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }  

  get email() {
    return this.userForm.get('email');
  }

  get mobileNumber() {
    return this.userForm.get('mobileNumber');
  }

  // Reset student form's values
  ResetForm() {
    this.userForm.reset();
  }  
 
  submitUserData() {
    this.crudApi.AddUser(this.userForm.value); // Submit student data using CRUD API
    this.toastr.success(this.userForm.controls['firstName'].value + ' successfully added!'); // Show success message when data is successfully submited
    this.ResetForm();  // Reset form when clicked on reset button
   };

}
