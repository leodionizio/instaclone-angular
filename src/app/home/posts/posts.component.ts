import { Component, OnInit } from '@angular/core';
import { BdService } from './../../bd.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  public email: string;
  public posts: any[] = [];
  constructor(
    private bdService: BdService
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;

      this.refreshTimeLine();
    })
  }

  public refreshTimeLine(): void {
    this.bdService.viewPosts(this.email)
      .then(posts => {
        this.posts = posts;
      })
  }
}
