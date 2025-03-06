import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatSlideToggleModule } from "@angular/material/slide-toggle";

@Component({
  selector: 'app-layout-page',
  imports: [RouterOutlet, MatSlideToggleModule],
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {

}
