import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public form: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'senha': new FormControl(null)
  })

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  public mostrarPainelCadastro(): void {
    this.exibirPainel.emit('cadastro');
  }

  public login(): void {
    // console.log(this.form.value)

    this.auth.login(
      this.form.value.email, this.form.value.senha
    )
  }
}
