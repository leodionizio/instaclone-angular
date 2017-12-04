import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

// import config from config file
// config by firebase connection
import config from './fbconfig';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {

    firebase.initializeApp(config);
  }
}
