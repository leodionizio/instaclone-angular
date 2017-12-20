import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('posts') public posts: any;


  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() { }

  public logout(): void {
    this.auth.logout();
  }

  public attTimeLine(): void {
    this.posts.refreshTimeLine();
  }

}
