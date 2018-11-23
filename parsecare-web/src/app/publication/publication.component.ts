import {Component, OnInit, Input, OnChanges} from '@angular/core';
import { Publication } from '../models/Publication';
import {Comment} from "../models/Comment";
import {ComentarioService} from "../services/Comentarios.Service";

@Component({
  selector: 'publication-component',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})

export class PublicationComponent implements OnInit, OnChanges {
    
  @Input() publication: Publication;
  comentario: Comment;

  isenabled: boolean;
  variable: string;

    constructor(private comentarioService: ComentarioService) {
      //this.publication = JSON.parse(this.publication);
      //this.comments = this.publication.comments;
      this.comentario = new Comment();
    }

    submitComment() {
      this.comentario.publicationId = this.publication.id;
      this.comentario.user.id = parseInt(sessionStorage.getItem('id'));
      console.log(this.comentario);
      this.comentarioService.addComentario(this.comentario)
        .subscribe(res => {
          alert('Comentario comentado');
        }, err => {
          console.error(err);
        });
    }
  ngOnInit() {
    // @ts-ignore
    this.publication = JSON.parse(this.publication);
    this.isenabled = true;
    this.variable = 'ola';
  }

  ngOnChanges() {
    // @ts-ignore
    console.log(JSON.parse(this.publication));
  }
}
