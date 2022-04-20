import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Advices } from './advice.model';

@Injectable({
  providedIn: 'root',
})
export class AdviceService {
  constructor(private readonly http: HttpClient) {}

  getAdvice(): Observable<Advices> {
    const adviceUrl = new URL('https://api.adviceslip.com/advice');
    return this.http.get<Advices>(adviceUrl.toString());
  }
}
