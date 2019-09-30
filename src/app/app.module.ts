import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

import { AdminModule } from  './admin/admin.module';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';

import { TermsComponent } from './terms/terms.component';

const config ={
  firebaseConfig:{
    apiKey: "AIzaSyDb3YW2ffNQfFVOTho5KyyYzFgk8egcvJY",
    authDomain: "protituloproduccion-11e16.firebaseapp.com",
    databaseURL: "https://protituloproduccion-11e16.firebaseio.com",
    projectId: "protituloproduccion-11e16",
    storageBucket: "",
    messagingSenderId: "1054870562797",
    appId: "1:1054870562797:web:f9aca4b22bb782d29ae9e4"
}}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    TermsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    FormsModule,
    ReactiveFormsModule,
    

    AngularFireModule.initializeApp(config.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,


    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

