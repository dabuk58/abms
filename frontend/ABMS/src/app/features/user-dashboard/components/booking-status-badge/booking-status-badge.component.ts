import { Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ChipModule } from 'primeng/chip';
import { BookingStatus } from '../../../../core/enums/booking-status.enum';

@Component({
  selector: 'app-booking-status-badge',
  standalone: true,
  imports: [ChipModule, TranslatePipe],
  templateUrl: './booking-status-badge.component.html',
  styleUrl: './booking-status-badge.component.scss',
})
export class BookingStatusBadgeComponent {
  @Input() status!: BookingStatus;

  BookingStatus = BookingStatus;
}
