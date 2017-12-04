import { UsuarioModel } from './acesso/usuario.model'
import * as firebase from 'firebase';

export class AuthService {
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
        console.log(res);
      })
      .catch((err: Error) => {
        return Promise.reject(err);
      })
  }


}
