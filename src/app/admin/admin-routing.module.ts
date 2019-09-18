import { NgModule } from  '@angular/core';
import { Routes, RouterModule } from  '@angular/router';

import { ProjectComponent } from  './project/project.component';
import { ProjectListComponent } from  './project-list/project-list.component';
import { ProjectCreateComponent } from  './project-create/project-create.component';
import { ProjectUpdateComponent } from  './project-update/project-update.component';
import { LoginComponent } from  './login/login.component';
import { AdminGuard } from  './admin.guard';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UsuarioListaComponent } from './usuario-lista/usuario-lista.component';
import { RegisterComponent } from './register/register.component';

const  routes:  Routes  = [
{ path:  'admin', component:  ProjectComponent,children: [
    { path:  'list', component:  ProjectListComponent, canActivate: [AdminGuard] },
    { path:  'create', component:  ProjectCreateComponent, canActivate: [AdminGuard] }, 
    { path:  'update', component:  ProjectUpdateComponent, canActivate: [AdminGuard] },
    { path:  'login',component:  LoginComponent},
    { path:  'register', component: RegisterComponent},
    { path: 'add-user', component: AddUserComponent, canActivate: [AdminGuard]},
    { path: 'edit-user/:id', component: EditUserComponent, canActivate: [AdminGuard]},
    { path: 'user-list', component: UserListComponent, canActivate: [AdminGuard]},
    { path: 'usuario-lista', component: UsuarioListaComponent, canActivate: [AdminGuard]}
] }
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export  class  AdminRoutingModule { }