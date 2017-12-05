import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

import { FormGroup, FormControl } from '@angular/forms';
import { BdService } from './../../bd.service';
import { ProgressService } from '../../progress.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  public email: string;
  private image: any;

  public progessPost: string = 'Pendente';
  public percentupload: number = 0;

  public form: FormGroup = new FormGroup({
    'titulo': new FormControl(null),
  })

  constructor(
    private bd: BdService,
    private progress: ProgressService
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
    })
  }

  public publish(): void {
    this.bd.publish({
      email: this.email,
      titulo: this.form.value.titulo,
      image: this.image
    })

    let progressUpload = Observable.interval(1500);

    let continua = new Subject();

    continua.next(true)

    progressUpload
      .takeUntil(continua)
      .subscribe(
      () => {
        console.log(this.progress.status)
        console.log(this.progress.state)
        this.progessPost = 'Andamento';
        if (this.progress.status === 'Concluido') {
          continua.next(false);
          this.progessPost = 'Concluido';
        }
      })
  }

  public imageUpload(event: Event): void {
    this.image = (<HTMLInputElement>event.target).files[0];
  }
}
