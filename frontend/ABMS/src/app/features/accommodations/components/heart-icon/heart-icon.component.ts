import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heart-icon',
  standalone: true,
  imports: [],
  templateUrl: './heart-icon.component.html',
  styleUrl: './heart-icon.component.scss',
})
export class HeartIconComponent {
  @Input() filled: boolean = false;
}
