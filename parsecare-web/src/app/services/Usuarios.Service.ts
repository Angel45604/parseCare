import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Usuario } from '../models/Usuario';
import { map } from 'rxjs/operators';


@Injectable()
export class UsuarioService {
  constructor (private http: Http) {}
  private statusurl = 'http://localhost:3000/api/users';

  getUsuarios(){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(this.statusurl, {headers: headers})
      .pipe(map((res:Response) => res.json()));
  }

  addUsuario (usuario: Object){
    let headers = new Headers({ 'Content-Type': 'application/json' });

    return this.http.post(this.statusurl, usuario, {headers: headers}) // ...using post request
      .pipe(map((res:Response) => res.json())); // ...and calling .json() on the response to return data
  }

  removeUsuario (idUsuario: string){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.delete(`${this.statusurl}/${idUsuario}`, {headers: headers}) // ...using put request
      .pipe(map(res => res )); // ...now we return data
  }

  login (usuario: Object) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post('http://localhost:3000/storage/login', usuario, {headers: headers})
      .pipe(map(res => res.json()));
  }
}
