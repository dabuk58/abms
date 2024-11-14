import { Component } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-overlay-loader',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './overlay-loader.component.html',
  styleUrl: './overlay-loader.component.scss',
})
export class OverlayLoaderComponent {}
