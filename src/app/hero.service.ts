import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = "api/heroes";

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    //this.messageService.add("Hero Service: Fetched heroes.");
    this.log("fetched heroes from in memory data service.");
    return this.http.get<Hero[]>(this.heroesUrl)
       .pipe(
          tap(_ => this.log('fetched heroes')),
          catchError( this.handleError("getHeroes", []) )
       );
  }

  getHero(id:number): Observable<Hero> {
    //this.messageService.add(`HeroService: fetched hero id=${id}`);
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
       .pipe(
         tap( _ => this.log(`Get hero by id ${id}`) ),
         catchError(this.handleError<Hero>("getHero"))
       );
  }

  searchHeroes(term: string): Observable<Hero[]>{
    if (!term.trim()) {
      return of([]);
    }

    const url = `${this.heroesUrl}/?name=${term}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        tap(_ => this.log(`Search heroes by name=${term}`) ),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );

  }

  updateHero(hero: Hero): Observable<any>{
    return this.http.put<Hero>(this.heroesUrl, hero, httpOptions)
       .pipe(
         tap(_ => this.log(`Updated hero id = ${hero.id}`)),
         catchError(this.handleError<any>('UpdateHero'))
       );
  }

  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
        .pipe(
          tap((hero: Hero) => this.log(`Create hero id = ${ hero.id }`)),
          catchError( this.handleError<Hero>('addHero'))
        );
  }

  deleteHero(heroOrId: Hero | number): Observable<Hero>{
    const id = typeof heroOrId === 'number' ? heroOrId : heroOrId.id;
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, httpOptions)
        .pipe(
          tap(_ => this.log(`Deleted hero id=${id}`)),
          catchError( this.handleError<Hero>('deleteHero') )
        );

  }



  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
