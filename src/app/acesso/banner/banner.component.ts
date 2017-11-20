import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { ImageModel } from './image.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  animations: [
    trigger('banner', [
      state('hidden', style({
        opacity: 0
      })),
      state('visible', style({
        opacity: 1
      })),
      transition('hidden <=> visible', animate('1s ease-in'))
    ])
  ]
})
export class BannerComponent implements OnInit {

  public state: string = 'visible';
  public images: ImageModel[] = [
    { state: 'visible', url: '/assets/banner-acesso/img_1.png' },
    { state: 'hidden', url: '/assets/banner-acesso/img_2.png' },
    { state: 'hidden', url: '/assets/banner-acesso/img_3.png' },
    { state: 'hidden', url: '/assets/banner-acesso/img_4.png' },
    { state: 'hidden', url: '/assets/banner-acesso/img_5.png' }
  ]

  constructor() { }

  ngOnInit() {
    setTimeout(() => this.logicaRotacao(), 3000)
  }

  public logicaRotacao(): void {

    // auxiliar na exibicao da proxima imagem
    let idx: number;

    // ocultar imagem
    for (let i: number = 0; i <= 4; i++) {
      if (this.images[i].state === 'visible') {
        this.images[i].state = 'hidden';

        idx = i === 4 ? 0 : i + 1;

        break
      }
    }

    // exibir proxima imagem
    this.images[idx].state = 'visible';

    setTimeout(() => this.logicaRotacao(), 3000)
  }

}
