import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = "api/heroes";

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getHeroes2(): Observable<Hero[]> {
    this.messageService.add("Hero Service: Fetched heroes.");
    return of(HEROES);
  }

  getHeroes(): Observable<Hero[]> {
    //this.messageService.add("Hero Service: Fetched heroes.");
    this.log("fetched heroes from in memory data service.");
    return this.http.get<Hero[]>(this.heroesUrl);
  }

  getHero(id:number): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find( h => h.id == id ));
  }

  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }
}
