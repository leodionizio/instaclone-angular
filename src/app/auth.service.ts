import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioModel } from './acesso/usuario.model';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  public token_id: string;

  constructor(
    private router: Router
  ) { }

  public cadastrarUsuario(usuario: UsuarioModel): Promise<any> {

    // metodo de autenticacao de usuario por email e senha
    return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
      .then((res: any) => {

        // remover senha do usuario
        delete usuario.senha;

        // registrando dados complementares do usuario no path email base64
        firebase.database().ref(`user_info/${btoa(usuario.email)}`)
          .set(usuario)

      })
      .catch((err: Error) => {
        return Promise.reject(err);
      })
  }

  public login(email, senha): void {

    firebase.auth().signInWithEmailAndPassword(email, senha)
      .then((res: any) => {
        firebase.auth().currentUser.getIdToken()
          .then((idToken: string) => {
            this.token_id = idToken;
            localStorage.setItem('idToken', idToken);
            this.router.navigate(['/home']);
          })
      })
      .catch((err: Error) => {
        return Promise.reject(err);
      })
  }

  public authenticated(): boolean {

    if (this.token_id === undefined && localStorage.getItem('idToken')) {
      this.token_id = localStorage.getItem('idToken')
    }

    if (this.token_id === undefined) {
      this.router.navigate(['/']);      
    }

    return this.token_id !== undefined;
  }

  public logout(): void {

    firebase.auth().signOut()
      .then(() => {
        localStorage.removeItem('idToken');
        this.token_id = undefined;
        this.router.navigate(['/'])
      })
  }


}
