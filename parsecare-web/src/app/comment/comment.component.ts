import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "../models/Comment";

@Component({
  selector: 'comment-component',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input('comment') comment: Comment;

  constructor() { }

  ngOnInit() {
    // @ts-ignore
    this.comment = JSON.parse(this.comment);
    console.log(this.comment);
  }

}
