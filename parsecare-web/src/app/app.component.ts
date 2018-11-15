import {Component, OnInit} from '@angular/core';
import { UsuarioService} from "./services/Usuarios.Service";

@Component({
  selector: 'app-memes',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor(private usuarioService: UsuarioService) {}

  usuarios = [];

  ngOnInit() {
    this.usuarioService.getUsuarios().subscribe(usuarios => {
      console.log(usuarios);
      this.usuarios = usuarios;
    }, err => {
      console.error(err);
    });
  }
}
