import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import {UsuarioService} from "../services/Usuarios.Service";
import {Usuario} from "../models/Usuario";
import {Router} from "@angular/router";
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'registro-component',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);
  nicknameFormControl = new FormControl('', [
    Validators.required,
  ]);
  nombreFormControl = new FormControl('', [
    Validators.required,
  ]);
  apellidosFormControl = new FormControl('', [
    Validators.required,
  ]);
  matcher = new MyErrorStateMatcher();

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
