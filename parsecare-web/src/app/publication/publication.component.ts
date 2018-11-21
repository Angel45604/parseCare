import { Component, OnInit, Input } from '@angular/core';
import { Publication } from '../models/Publication';

@Component({
  selector: 'publication-component',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})

export class PublicationComponent implements OnInit {
    
  @Input("publicacionInput") publicacionInput: any;
  @Input("usuario") usuario : string;
  @Input("topic") topic : string;
  @Input("likes") likes : number;
  @Input("content") content : string;
  @Input("archivo") archivo: string;
    publicacion : Publication;
    isenabled: boolean;
    variable: string;

    constructor() {}
    
  ngOnInit() {
    this.isenabled = true;
    this.variable = 'ola';
  }
}
