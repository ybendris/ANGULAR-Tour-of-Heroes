import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { HEROES } from '../models/mock-heroes';
import { Hero } from '../models/hero.model';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) {}

  getHeroes() : Observable<Hero[]>{
    this.messageService.add("HeroService: fetched heroes");
    return of(HEROES);
  } 
}
