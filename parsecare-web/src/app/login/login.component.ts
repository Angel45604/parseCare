import { Component, OnInit } from '@angular/core';
import { Publication } from '../models/Publication';
import {Usuario} from "../models/Usuario";
import {UsuarioService} from "../services/Usuarios.Service";
import {Router} from "@angular/router";

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  usuario: Usuario;

  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.usuario = new Usuario();
  }

  login() {
    console.log(this.usuario)
    this.usuarioService.login(this.usuario)
      .subscribe(res => {
        console.log(res);
        let token = res;
        // @ts-ignore
        sessionStorage.setItem('token', token.token);
        // @ts-ignore
        sessionStorage.setItem('id', token.id);
        this.router.navigate(['/']);
      }, err => {
        console.error(err);
      });
  }

  ngOnInit() {
  }
}
