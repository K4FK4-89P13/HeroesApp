import { Component, inject, OnInit } from '@angular/core';

import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';
import { MatDividerModule } from '@angular/material/divider';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-list-page',
  imports: [MatDividerModule, CardComponent],
  templateUrl: './list-page.component.html',
  styles: ``
})
export class ListPageComponent implements OnInit {

  public heroes: Hero[] = [];

  private heroesService: HeroesService = inject(HeroesService);
  
  ngOnInit(): void {
    this.heroesService.getHeroes()
      .subscribe( heroes => this.heroes = heroes )
  }
}
