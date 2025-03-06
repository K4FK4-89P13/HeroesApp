import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from "@angular/material/button";
import { AuthService } from '../../services/auth.service';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-login-page',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, RouterLink],
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  onLogin(): void {
    this.authService.login('example@ddd', '123456')
      .subscribe( user => {
        this.router.navigate(['/']);
      })
  }
}
