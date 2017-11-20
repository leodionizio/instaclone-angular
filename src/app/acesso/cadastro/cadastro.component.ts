import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();
  
    constructor() { }
  
    ngOnInit() {
    }
  
    public mostrarPainelLogin(): void {
      this.exibirPainel.emit('login');
    }

}
