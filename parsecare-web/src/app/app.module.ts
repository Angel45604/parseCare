import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { HttpModule, RequestOptions, Headers } from '@angular/http';
import { HttpClientModule} from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PublicationContainer } from './publication-container/publication.component';
import { PublicationComponent } from './publication/publication.component';
import { UsuarioService } from './services/Usuarios.Service';

import { PublicacionService } from './services/Publicaciones.Service';
import { ComentarioService } from './services/Comentarios.Service';
//import { MenubarComponent } from './menu-bar/menu-bar.component';
//material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    PublicationContainer,
    PublicationComponent,
    //MenubarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    //Angular Material
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatListModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatSnackBarModule
  ],
  providers: [
    UsuarioService,
    PublicacionService,
    ComentarioService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
