import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { catchError, from, map, Observable, of } from 'rxjs';

import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environments.baseUrl;

  private http = inject(HttpClient);

  private _heroes: Hero[] = [];

  constructor() {
    this.loadHeroes();
  }

  private async loadHeroes() {
    try{
      const response = await fetch('data/db.json');
      const data = await response.json();
      this._heroes = data.heroes;
    } catch (error) {
      console.log("Error al cargar los héroes:", error);
    }
  }

  getHeroes(): Observable<Hero[]> {
    //return this.http.get<Hero[]>(`${ this.baseUrl }/heroes`)
    if (this._heroes.length > 0) {
      return of(this._heroes);
    }
  
    return from(this.loadHeroes().then(() => this._heroes));
  }

  getHeroById(id: string): Observable<Hero|undefined> {
    /* return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError(error => of(undefined))
      ) */
    const hero = this._heroes.find( h => h.id === id );
    return of(hero);
  }

  getSuggestions(query: string): Observable<Hero[]> {
    //return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}`);
    const suggestions = this._heroes.filter( h => 
      h.superhero.toLowerCase().includes(query.toLowerCase())
    );
    return of(suggestions);
  }

  // Añadir Heroe
  addHero(hero: Hero): Observable<Hero> {
    //return this.http.post<Hero>(`${ this.baseUrl }/heroes`, hero);
    this._heroes.push(hero);
    return of(hero);
  }

  // Actualizar Heroe
  updateHero(hero: Hero): Observable<Hero> {
    if(!hero.id) throw Error('Hero id is required');
    //return this.http.patch<Hero>(`${ this.baseUrl }/heroes/${hero.id}`, hero);
    const index = this._heroes.findIndex( h => h.id === hero.id );
    if( index !== -1 ) {
      this._heroes[index] = hero;
    }
    return of(hero);
  }

  // Eliminar Heroe
  deleteHeroById(id: string): Observable<boolean> {
    /* return this.http.delete<Hero>(`${ this.baseUrl }/heroes/${id}`)
      .pipe(
        catchError(err => of(false)),
        map(res => true) 
      )*/
    const initialLength = this._heroes.length;
    this._heroes = this._heroes.filter( h => h.id !== id );
    return of(this._heroes.length < initialLength);
  }
}
