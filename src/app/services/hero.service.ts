import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { HEROES } from '../models/mock-heroes';
import { Hero } from '../models/hero.model';
import { Observable, of, catchError, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http: HttpClient, private messageService: MessageService) {}
  private heroesUrl = 'api/heroes';  // URL to web api

  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }

  /*
  getHeroes() : Observable<Hero[]>{
    this.messageService.add("HeroService: fetched heroes");
    return of(HEROES);
  }*/
  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
  getHeroes (): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero | undefined> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }
}
