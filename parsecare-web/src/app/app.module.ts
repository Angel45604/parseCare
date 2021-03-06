import { HttpModule, RequestOptions, Headers } from '@angular/http';
import { HttpClientModule} from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
//Animations
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//Material
import {MaterialModule} from './material-component';
import { NgModule } from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PublicationContainerComponent } from './publication-container/publication-container.component';
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
import { CommentComponent } from './comment/comment.component';
import { CommentContainerComponent } from './comment-container/comment-container.component';
import {LoginComponent} from "./login/login.component";
import {RouterModule, Routes} from "@angular/router";
import {InitComponent} from "./init.component";
import {RegistroComponent} from "./registro/registro.component";
import {InicioComponent} from "./Inicio/inicio.component";
import {SoporteComponent} from "./soporte/soporte.component";
import {BibliotecaComponent} from "./Biblioteca/biblioteca.component";
import {ConsejosComponent} from "./Consejos/consejos.component";
import {CulturaComponent} from "./Cultura/cultura.component";

import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire";
import {AngularFireStorageModule, StorageBucket} from '@angular/fire/storage';
import { ReactiveFormsModule } from '@angular/forms';

const appRoutes: Routes = [
  {path: '', component: AppComponent },
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'soporte', component: SoporteComponent},
  {path: 'biblioteca', component: BibliotecaComponent},
  {path: 'consejos', component: ConsejosComponent},
  {path: 'cultura', component: CulturaComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    PublicationContainerComponent,
    PublicationComponent,
    CommentComponent,
    CommentContainerComponent,
    LoginComponent,
    InitComponent,
    RegistroComponent,
    InicioComponent,
    SoporteComponent,
    BibliotecaComponent,
    ConsejosComponent,
    CulturaComponent
    //MenubarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    HttpClientModule,
    //Angular Material
    MaterialModule,
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
    MatSnackBarModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,

  ],
  providers: [
    UsuarioService,
    PublicacionService,
    ComentarioService,
    { provide: StorageBucket, useValue: 'parsecare.appspot.com' }
  ],
  bootstrap: [InitComponent]
})

export class AppModule { }
