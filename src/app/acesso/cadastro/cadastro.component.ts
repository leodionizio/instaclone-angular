import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { UsuarioModel } from '../usuario.model';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public isloading: boolean = false;
  public msgReturn: string = '';

  public form: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'nome_completo': new FormControl(null),
    'nome_usuario': new FormControl(null),
    'senha': new FormControl(null)
  })

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  public mostrarPainelLogin(): void {
    this.exibirPainel.emit('login');
  }

  public cadastrarUsuario(): void {
    this.isloading = true;
    this.msgReturn = '';

    let usuario: UsuarioModel = new UsuarioModel(
      this.form.value.email,
      this.form.value.nome_completo,
      this.form.value.nome_usuario,
      this.form.value.senha,
    )
    this.auth.cadastrarUsuario(usuario)
      .then((res) => {
        this.isloading = false;
        this.mostrarPainelLogin();
      })
      .catch((err) => {
        this.isloading = false;
        this.msgReturn = err;
      })
  };

}
