import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { ProgressService } from './progress.service';

@Injectable()
export class BdService {

    constructor(private progress: ProgressService) { }

    public publish(post: any): void {

        console.log(post);
        let imageName = Date.now();

        firebase.storage().ref()
            .child(`images/${imageName}`)
            .put(post.image)
            .on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot: any) => {
                this.progress.status = 'Andamento';
                this.progress.state = snapshot;
                console.log('qualquer coisa',snapshot);
            },
            (error) => {
                this.progress.status = 'Falha';
                console.log(error);
            },
            () => {
                // finalização do processo
                this.progress.status = 'Concluido';
                console.log('upload completo')
            })

        firebase.database().ref(`publicacoes/${btoa(post.email)}`)
            .push({
                titulo: post.titulo
            })
    }
}