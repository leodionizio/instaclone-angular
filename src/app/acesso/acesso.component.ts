import { Component, OnInit, trigger, style, state, transition, animate, keyframes } from '@angular/core';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.scss'],
  animations: [
    trigger('animation-banner', [
      state('created', style({
        opacity: 1
      })),
      transition('void => created', [
        style({ opacity: 0, transform: 'translate(-70px, 0)' }),
        animate('500ms 0s ease-in-out') // duração, delay e aceleração
      ])
    ]),
    trigger('animation-panel', [
      state('created', style({
        opacity: 1
      })),
      transition('void => created', [
        style({ opacity: 0, transform: 'translate(70px, 0)' }),
        // animate('500ms 0s ease-in-out') // duração, delay e aceleração
        animate('1.5s 0s ease-in-out', keyframes([
          style({ offset: 0.15, opacity: 1, transform: 'translateX(0)' }),
          style({ offset: 0.86, opacity: 1, transform: 'translateX(0)' }),

          style({ offset: 0.88, opacity: 1, transform: 'translateY(-10px)' }),
          style({ offset: 0.90, opacity: 1, transform: 'translateY(10px)' }),
          style({ offset: 0.92, opacity: 1, transform: 'translateY(-10px)' }),
          style({ offset: 0.94, opacity: 1, transform: 'translateY(10px)' }),
          style({ offset: 0.96, opacity: 1, transform: 'translateY(-10px)' }),
          style({ offset: 0.98, opacity: 1, transform: 'translateY(10px)' }),
        ])) // duração, delay e aceleração
      ])
    ])
  ]
})
export class AcessoComponent implements OnInit {

  public stateBanner: string = 'created';
  public statePanel: string = 'created';

  public cadastro: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  public exibirPainel(event: string): void {
    this.cadastro = event === 'cadastro' ? true : false;
  }

  public inicioDaAnimacao(): void {
    console.log('inicio da animacao!')
  }

  public fimDaAnimacao(): void {
    console.log('Fim da animacao!')
  }

}
