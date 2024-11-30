import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { TooltipModule } from 'primeng/tooltip';
import { fillString } from '../../tools/functions';

@Component({
  selector: 'app-control-error-wrapper',
  standalone: true,
  imports: [TranslatePipe, TooltipModule],
  templateUrl: './control-error-wrapper.component.html',
  styleUrl: './control-error-wrapper.component.scss',
})
export class ControlErrorWrapperComponent {
  @Input() control!: FormControl | AbstractControl | null;

  fillString = fillString;
}
