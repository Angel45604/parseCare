import { Component, OnInit } from '@angular/core';
import {UsuarioService} from "../services/Usuarios.Service";
import {Usuario} from "../models/Usuario";
import {Router} from "@angular/router";
@Component({
  selector: 'registro-component',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {
  usuario: Usuario;
  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.usuario = new Usuario();
  }

  submitRegistro() {
    console.log(this.usuario)
    this.usuarioService.addUsuario(this.usuario)
      .subscribe(res => {
        console.log(res);
        alert('Usuario Registrado');
        this.router.navigate(['/login']);
      }, err => {
        console.error(err);
      });
  }

  ngOnInit() {
  }
}
