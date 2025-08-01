import { Injectable } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class HeroesService {

  private localStorageKey = 'heroes';
  private rawDataUrl = 'https://raw.githubusercontent.com/K4FK4-89P13/HeroesApp/refs/heads/main/public/data/dbheroes.json'; // Cambia esta URL

  constructor(private http: HttpClient) {
    this.initStorage();
  }

  /**
   * Inicializa LocalStorage si está vacío.
   * Descarga los datos desde GitHub Raw la primera vez.
   */
  private initStorage(): void {
    const data = localStorage.getItem(this.localStorageKey);
    if (!data) {
      this.http.get<Hero[]>(this.rawDataUrl)
        .subscribe(initialHeroes => {
          localStorage.setItem(this.localStorageKey, JSON.stringify(initialHeroes));
        });
    }
  }

  /**
   * Retorna todos los héroes desde LocalStorage.
   */
  getHeroes(): Observable<Hero[]> {
    const heroes: Hero[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    return of(heroes);
  }

  /**
   * Retorna un héroe por su ID.
   * @param id - ID del héroe a buscar
   */
  getHeroById(id: string): Observable<Hero | undefined> {
    const heroes: Hero[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    const hero = heroes.find((h: Hero) => h.id === id);
    return of(hero);
  }

  /**
   * Agrega un nuevo héroe al LocalStorage.
   * Se le asigna un ID único con uuid.
   * @param hero - Héroe sin ID (se genera automáticamente)
   */
  addHero(hero: Omit<Hero, 'id'>): Observable<Hero> {
    const heroes: Hero[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    const newHero: Hero = { id: uuidv4(), ...hero };
    heroes.push(newHero);
    localStorage.setItem(this.localStorageKey, JSON.stringify(heroes));
    return of(newHero);
  }

  /**
   * Actualiza un héroe existente por su ID.
   * @param updatedHero - Objeto héroe completo (incluye ID)
   */
  updateHero(updatedHero: Hero): Observable<Hero> {
    let heroes: Hero[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    heroes = heroes.map((h: Hero) => h.id === updatedHero.id ? updatedHero : h);
    localStorage.setItem(this.localStorageKey, JSON.stringify(heroes));
    return of(updatedHero);
  }

  /**
   * Elimina un héroe por su ID.
   * @param id - ID del héroe a eliminar
   */
  deleteHeroById(id: string): Observable<boolean> {
    const heroes: Hero[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    const newHeroes = heroes.filter((h: Hero) => h.id !== id);
    localStorage.setItem(this.localStorageKey, JSON.stringify(newHeroes));
    return of(true);
  }


  getSuggestions(term: string): Observable<Hero[]> {
  const heroes: Hero[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
  const filtered = heroes.filter((h: Hero) =>
    h.superhero.toLowerCase().includes(term.toLowerCase())
  );
  return of(filtered);
}

}
