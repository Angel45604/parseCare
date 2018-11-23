import { Component, OnInit, Input } from '@angular/core';
import { Publication } from '../models/Publication';
import {PublicacionService} from "../services/Publicaciones.Service";
import {Comment} from "../models/Comment";
@Component({
  selector: 'comment-container-component',
  templateUrl: './comment-container.component.html',
  styleUrls: ['./comment-container.component.css']
})

export class CommentContainerComponent implements OnInit {
  @Input("comments") comments: Comment[];

  constructor(private publicationService: PublicacionService) {}

  ngOnInit() {
    // @ts-ignore
    this.comments = JSON.parse(this.comments);
    console.log(this.comments);
  }
}
