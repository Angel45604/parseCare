import {Component, OnInit} from '@angular/core';
import { UsuarioService} from "./services/Usuarios.Service";
import { PublicacionService} from "./services/Publicaciones.Service";

@Component({
  selector: 'app-memes',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor(private usuarioService: UsuarioService, private publicacionService: PublicacionService) {}

  usuarios = [];

  publicaciones = [];

  ngOnInit() {
    this.usuarioService.getUsuarios().subscribe(usuarios => {
      console.log(usuarios);
      this.usuarios = usuarios;
    }, err => {
      console.error(err);
    });
    this.publicacionService.getPublicaciones().subscribe(publicaciones => {
      console.log(publicaciones);
      this.usuarios = publicaciones;
    }, err => {
      console.error(err);
    });
  }
}
