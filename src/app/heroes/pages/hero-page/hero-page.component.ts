import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, Subject, switchMap } from 'rxjs';

import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';
import { HeroImagePipe } from '../../pipes/hero-image.pipe';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-hero-page',
  imports: [MatGridListModule, MatProgressSpinnerModule, MatCardModule, MatListModule, MatButtonModule, MatIconModule, MatChipsModule, HeroImagePipe],
  templateUrl: './hero-page.component.html',
  styles: `
    .hero-image-container {
      min-width: 300px;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .hero-card{
      overflow:hidden;
      /* height: auto; */
    }
    .hero-image{
      max-width: 100%;
      max-height: 100%;
      object-fit: cover;
      box-sizing: border-box;
    }
    .img{
      border-radius: 4px;
      width: 100%;
    }
    
  `
})
export class HeroPageComponent implements OnInit {

  public hero?: Hero;
  private destroy$ = new Subject<void>(); // Subject para cancelar la suscripción

  private heroesService: HeroesService = inject(HeroesService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        delay(1000),
        switchMap( params => this.heroesService.getHeroById(params['id']) )
      )
      .subscribe(hero => {
        if( !hero ) return this.router.navigate(['/heroes/list']);

        this.hero = hero;
        console.log({hero});
        return
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next(); // Emite para cancelar la suscripción
    this.destroy$.complete(); // Completa el Subject
  }

  public goBack():void {
    this.router.navigateByUrl('heroes/list')
  }
}
