import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search-page',
  imports: [MatFormFieldModule, MatInputModule, MatAutocompleteModule, JsonPipe, ReactiveFormsModule],
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent {

  public searchInput = new FormControl('');
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  private heroesService = inject(HeroesService);

  public searchHero() {
    const value: string = this.searchInput.value || '';
    this.heroesService.getSuggestions(value)
      .subscribe( heroes => this.heroes = heroes )
  }

  onSelectedOption( event: MatAutocompleteSelectedEvent ): void {
    if( !event.option.value ) {
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);

    this.selectedHero = hero;
  }
}
