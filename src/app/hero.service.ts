import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add("Hero Service: Fetched heroes.");
    return of(HEROES);
  }

  getHero(id:number): Observable<Hero> {
    this.messageService.add("Hero Service: Fetched hero id=${id}`");
    return of(HEROES.find( h => h.id == id ));
  }
}