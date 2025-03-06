import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { switchMap } from 'rxjs';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { HeroImagePipe } from '../../pipes/hero-image.pipe';

import { MatDialog } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { subscribe } from 'diagnostics_channel';


@Component({
  selector: 'app-new-page',
  imports: [
    MatDividerModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule,
    ReactiveFormsModule,
    HeroImagePipe
  ],
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit {

  private heroesServices: HeroesService = inject(HeroesService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  //private snackbar = inject(MatSnackBar);
  private matDialog = inject(MatDialog);
  constructor(private snackbar: MatSnackBar) { snackbar = inject(MatSnackBar) }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  ngOnInit(): void {
    if( !this.router.url.includes('edit') ) return;

    this.activatedRoute.params
      .pipe(
        switchMap((params) => this.heroesServices.getHeroById(params['id']) )
      ).subscribe(hero => {
        this.heroForm.reset(hero);
        return;
      })
  }

  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl<string>('', {nonNullable: true}),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  })

  public publishers = [
    {id: 'DC Comics', desc: 'DC - Comics'},
    {id: 'Marvel Comics', desc: 'Marvel - Comics'},
  ];

  
  onSubmit(): void {
    if( this.heroForm.invalid ) return;

    if( this.currentHero.id ) {
      this.heroesServices.updateHero( this.currentHero )
        .subscribe(hero => {
          // Mostrar snackbar
          this.showSnackBar(`${hero.superhero} updated`)
        });

      return;
    }

    this.heroesServices.addHero( this.currentHero )
      .subscribe(hero => {
        // Mostrar snackbar y navegar a /heroes/list
        this.router.navigate(['/heroes/edit', hero.id]);
        this.showSnackBar(`${hero.superhero} created`);
      })
  }

  // Borrar heroe
  onDeleteHero() {
    if( !this.currentHero.id ) throw Error('Hero id is Required');

    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed().subscribe(result => {
      if( !result ) return;
      
      this.heroesServices.deleteHeroById( this.currentHero.id )
        .subscribe(wasDeleted => {
          if(wasDeleted) this.router.navigate(['/heroes']);
        } )
      
    });
  }

  public showSnackBar( message: string ): void {
    this.snackbar.open( message, 'done', {
      duration: 2500,
    } )
  }
}
