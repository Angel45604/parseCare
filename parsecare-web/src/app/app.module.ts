import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { HttpModule, RequestOptions, Headers } from '@angular/http';
import { HttpClientModule} from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule } from '@angular/material';

import { AppComponent } from './app.component';
//import { PublicationContainer } from './publication-container/publication.component';
//import { PublicationComponent } from './publication/publication.component';

import { UsuarioService } from './services/Usuarios.Service';
import { PublicacionService } from './services/Publicaciones.Service';

@NgModule({
  declarations: [
    AppComponent,
    //PublicationContainer,
    //PublicationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    //Angular Material
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatIconModule,


  ],
  providers: [
    UsuarioService,
    PublicacionService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
