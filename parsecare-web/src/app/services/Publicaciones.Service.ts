import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Publication } from '../models/Publication';
import { map } from 'rxjs/operators';


@Injectable()
export class PublicacionService {
  constructor (private http: Http) {}
  private statusurl = 'http://localhost:3000/api/publication';

  getPublicaciones(){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(this.statusurl, {headers: headers})
      .pipe(map((res:Response) => res.json()));
  }

  addPublicacion (publicacion: Object){
    let headers = new Headers({ 'Content-Type': 'application/json' });

    return this.http.post(this.statusurl, publicacion, {headers: headers}) // ...using post request
      .pipe(map((res:Response) => res.json())); // ...and calling .json() on the response to return data
  }

  removePublicacion (idPublication: string){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.delete(`${this.statusurl}/${idPublication}`, {headers: headers}) // ...using put request
      .pipe(map(res => res )) // ...now we return data
  }
}
