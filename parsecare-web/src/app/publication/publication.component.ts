import { Component, OnInit } from '@angular/core';
import { Publication } from '../models/Publication';

@Component({
  selector: 'publication-component',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})

export class PublicationComponent {
    
    publication : Publication;
    isenabled: boolean;
    variable: string;

    constructor() {}
    
  ngOnInit() {
    this.publication  = new Publication('ESTE ES EL TITULO', 'ESTE ES EL CONTENIDO', 'ANGELITO', 1);
    this.isenabled = false;
    this.variable = 'ola';
  }
}
