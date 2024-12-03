import { Component, OnDestroy } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { PanelModule } from 'primeng/panel';
import { Subject, takeUntil } from 'rxjs';
import { UserInfo } from '../../../../core/interfaces/user-info';
import { ToastService } from '../../../../core/services/toast.service';
import { UserService } from '../../../../core/services/user.service';
import { EditProfileDialogComponent } from '../edit-profile-dialog/edit-profile-dialog.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [PanelModule, TranslatePipe, ButtonModule],
  providers: [DialogService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnDestroy {
  userData: UserInfo;

  private readonly _destroying$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private dialogService: DialogService,
    private translation: TranslateService,
    private toastService: ToastService
  ) {
    this.userData = this.userService.activeUser || ({} as UserInfo);
  }

  onEdit(): void {
    const dialogRef = this.dialogService.open(EditProfileDialogComponent, {
      header: this.translation.instant('edit_profile'),
      width: '35%',
    });

    dialogRef.onClose
      .pipe(takeUntil(this._destroying$))
      .subscribe((success) => {
        if (success === true) {
          this.toastService.showSuccess(
            this.translation.instant('success'),
            this.translation.instant('your_profile_has_been_updated')
          );
        } else if (success === false) {
          this.toastService.showError(
            this.translation.instant('error'),
            this.translation.instant('error_occured_try_again_later')
          );
        }
      });
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
