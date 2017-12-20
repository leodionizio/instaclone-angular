import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as firebase from 'firebase';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

import { FormGroup, FormControl } from '@angular/forms';
import { BdService } from './../../bd.service';
import { ProgressService } from '../../progress.service';
import { } from '@angular/core/src/event_emitter';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  @Output() attTimeLine: EventEmitter<any> = new EventEmitter<any>();

  public email: string;
  private image: any;

  public progressPost: string = 'Pendente';
  public percentUpload: number = 0;

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
        this.progressPost = 'Andamento';
        this.percentUpload = Math.round((this.progress.state.bytesTransferred / this.progress.state.totalBytes) * 100);
        if (this.progress.status === 'Concluido') {
          this.progressPost = 'Concluido';
          continua.next(false);

          // emitir evento para o componente pai
          this.attTimeLine.emit();

        }
      })
  }

  public imageUpload(event: Event): void {
    this.image = (<HTMLInputElement>event.target).files[0];
  }
}
