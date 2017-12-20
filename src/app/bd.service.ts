import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { ProgressService } from './progress.service';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class BdService {

    constructor(private progress: ProgressService) { }

    public publish(post: any): void {


        firebase.database().ref(`publicacoes/${btoa(post.email)}`)
            .push({ titulo: post.titulo })
            .then(res => {
                let imageName = res.key;

                firebase.storage().ref()
                    .child(`images/${imageName}`)
                    .put(post.image)
                    .on(firebase.storage.TaskEvent.STATE_CHANGED,
                    (snapshot: any) => {
                        this.progress.status = 'Andamento';
                        this.progress.state = snapshot;
                    },
                    (error) => {
                        this.progress.status = 'Falha';
                    },
                    () => {
                        // finalização do processo
                        this.progress.status = 'Concluido';
                    })
            })
    }

    public viewPosts(email: string): Promise<any> {
        return new Promise((resolve, reject) => {

            firebase.database().ref(`publicacoes/${btoa(email)}`)
                .orderByKey()
                .once('value')
                .then((snapshot) => {
                    let posts: any[] = [];

                    snapshot.forEach((childSnapshot: any) => {

                        let post = childSnapshot.val();
                        post.key = childSnapshot.key;

                        posts.push(post);

                    })

                    return posts.reverse();
                })
                .then((posts: any) => {

                    posts.forEach(post => {

                        // consultar url da imagem
                        firebase.storage().ref()
                            .child(`images/${post.key}`)
                            .getDownloadURL()
                            .then((url: string) => {
                                post.url_imagem = url;

                                // consultar usuario
                                firebase.database().ref(`user_info/${btoa(email)}`)
                                    .once('value')
                                    .then((snapshot: any) => {
                                        post.usuario = snapshot.val().nome_usuario;
                                    })
                            })
                    });
                    resolve(posts);
                })
        })
    }
}