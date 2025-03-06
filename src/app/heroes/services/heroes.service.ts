import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { catchError, map, Observable, of } from 'rxjs';

import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environments.baseUrl;

  private http = inject(HttpClient);

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes`)
  }

  getHeroById(id: string): Observable<Hero|undefined> {
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError(error => of(undefined))
      )
  }

  getSuggestions(query: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}`);
  }

  // Añadir Heroe
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${ this.baseUrl }/heroes`, hero);
  }

  // Actualizar Heroe
  updateHero(hero: Hero): Observable<Hero> {
    if(!hero.id) throw Error('Hero id is required');
    return this.http.patch<Hero>(`${ this.baseUrl }/heroes/${hero.id}`, hero);
  }

  // Eliminar Heroe
  deleteHeroById(id: string): Observable<boolean> {
    return this.http.delete<Hero>(`${ this.baseUrl }/heroes/${id}`)
      .pipe(
        catchError(err => of(false)),
        map(res => true) 
      )
  }
}
