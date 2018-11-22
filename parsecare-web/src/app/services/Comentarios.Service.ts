import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Comment } from '../models/Comment';
import { map } from 'rxjs/operators';


@Injectable()
export class ComentarioService {
  constructor (private http: Http) {}
  private statusurl = 'http://localhost:3000/api/comment';

  getComentarios(){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(this.statusurl, {headers: headers})
      .pipe(map((res:Response) => res.json()));
  }

  addComentario (comentario: Object){
    let headers = new Headers({ 'Content-Type': 'application/json' });

    return this.http.post(this.statusurl, comentario, {headers: headers}) // ...using post request
      .pipe(map((res:Response) => res.json())); // ...and calling .json() on the response to return data
  }

  removeComentario (idComment: string){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.delete(`${this.statusurl}/${idComment}`, {headers: headers}) // ...using put request
      .pipe(map(res => res )) // ...now we return data
  }
}
