import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Hero } from '../../interfaces/hero.interface';

import { HeroImagePipe } from '../../pipes/hero-image.pipe';

@Component({
  selector: 'heroes-hero-card',
  imports: [RouterLink, MatCardModule, MatChipsModule, MatDividerModule, MatIconModule, MatButtonModule, HeroImagePipe],
  templateUrl: './card.component.html',
  styles: ``
})
export class CardComponent implements OnInit {

  @Input()
  public hero!: Hero;

  ngOnInit(): void {
    if (!this.hero) throw Error('Hero is required');
  }
}
