import { Component, OnInit } from '@angular/core';
import { Publication } from '../models/Publication';
import {PublicacionService} from "../services/Publicaciones.Service";
@Component({
  selector: 'publication-container-component',
  templateUrl: './publication-container.component.html',
  styleUrls: ['./publication-container.component.css']
})

export class PublicationContainer implements OnInit {
  publicaciones = [];

  constructor(private publicationService: PublicacionService) {}

  ngOnInit() {

    this.publicationService.getPublicaciones()
      .subscribe(publicaciones => {
        this.publicaciones = publicaciones;
      }, err => {
        console.error(err);
      })

    /*for(let i = 0; i< 5; i++) {
      this.publicaciones.push(new Publication(`Titulo ${i}`, `contenido ${i}`, `usuario ${i}`, i));
    }
    console.log(this.publicaciones);*/

    
  }
}
