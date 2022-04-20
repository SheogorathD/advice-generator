import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Advices } from './shared/advice.model';
import { AdviceService } from './shared/advice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('roll', [
      state('start', style({})),
      state('stop', style({ transform: 'rotate(-1440deg)' })),
      transition('start => stop', [animate('2s')]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  title = 'advice-generator';
  advice$!: Observable<Advices>;
  advice!: any;
  cooldown = false;
  state = 'start';

  constructor(private readonly adviceApi: AdviceService) {}

  loadNewAdvice(): void {
    if (!this.cooldown) {
      this.advice$ = this.adviceApi.getAdvice();
      this.cooldown = true;
      this.state = 'stop';
    }

    setTimeout(() => {
      this.cooldown = false;
      this.state = 'start';
    }, 2000);
  }

  ngOnInit(): void {
    this.advice$ = this.adviceApi.getAdvice();
  }
}
