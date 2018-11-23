import {Component, OnInit, Input, OnChanges} from '@angular/core';
import { Publication } from '../models/Publication';
import {Comment} from "@angular/compiler";

@Component({
  selector: 'publication-component',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})

export class PublicationComponent implements OnInit, OnChanges {
    
  @Input() publication: Publication;


  isenabled: boolean;
  variable: string;

    constructor() {
      //this.publication = JSON.parse(this.publication);
      //this.comments = this.publication.comments;
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
