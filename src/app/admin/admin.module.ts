import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectUpdateComponent } from './project-update/project-update.component';
import { ProjectComponent } from './project/project.component';
import { AdminRoutingModule } from  './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserListComponent } from './user-list/user-list.component';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';

import { RegisterComponent } from './register/register.component';





@NgModule({
  declarations: [

    ProjectListComponent, 
    ProjectCreateComponent, 
    ProjectUpdateComponent, 
    ProjectComponent, 
    LoginComponent,
    AddUserComponent,
    EditUserComponent,
    UserListComponent,
    
    RegisterComponent, 
    
  
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    
    ReactiveFormsModule, 
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    NgxPaginationModule
  ]
})
export class AdminModule { }
class MainModule{}
