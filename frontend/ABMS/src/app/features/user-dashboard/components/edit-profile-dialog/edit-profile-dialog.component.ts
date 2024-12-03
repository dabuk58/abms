import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { catchError, finalize, Observable, of, Subject, takeUntil } from 'rxjs';
import { EditUserDto } from '../../../../../api';
import { OverlayLoaderComponent } from '../../../../core/components/overlay-loader/overlay-loader.component';
import { LoaderEnum } from '../../../../core/enums/loader.enum';
import { UserInfo } from '../../../../core/interfaces/user-info';
import { LoaderService } from '../../../../core/services/loader.service';
import { ToastService } from '../../../../core/services/toast.service';
import { UserService } from '../../../../core/services/user.service';
import { ControlErrorWrapperComponent } from '../../../../shared/components/control-error-wrapper/control-error-wrapper.component';
import { phoneNumberValidator } from '../../../../shared/tools/validators';

@Component({
  selector: 'app-edit-profile-dialog',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    TranslatePipe,
    ControlErrorWrapperComponent,
    OverlayLoaderComponent,
    AsyncPipe,
  ],
  templateUrl: './edit-profile-dialog.component.html',
  styleUrl: './edit-profile-dialog.component.scss',
})
export class EditProfileDialogComponent implements OnInit, OnDestroy {
  form: FormGroup;

  isLoading$!: Observable<boolean>;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private loaderService: LoaderService,
    private userService: UserService,
    public dialogRef: DynamicDialogRef,
    private toastService: ToastService
  ) {
    this.form = this.fb.group({
      fullname: '',
      email: ['', Validators.required],
      phoneNumber: ['', phoneNumberValidator()],
    });
  }

  ngOnInit(): void {
    this.setFormValues();
    this.isLoading$ = this.loaderService.isActive(LoaderEnum.PROFILE_EDIT);
  }

  setFormValues(): void {
    const user: UserInfo | undefined = this.userService.activeUser;

    if (user) {
      this.form.setValue({
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
    }
  }

  getFormControlByName(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  onSave(): void {
    if (this.form.valid) {
      this.loaderService.setActive(LoaderEnum.PROFILE_EDIT);

      const params: EditUserDto = {
        email: this.form.get('email')?.value,
        phoneNumber: this.form.get('phoneNumber')?.value,
        fullname: this.form.get('fullname')?.value,
      };

      this.userService
        .updateUser$(params)
        .pipe(
          catchError(() => {
            this.dialogRef.close(false);
            return of();
          }),
          finalize(() =>
            this.loaderService.setInactive(LoaderEnum.PROFILE_EDIT)
          ),
          takeUntil(this._destroying$)
        )
        .subscribe((response) => {
          if (response.user) {
            const userData: UserInfo = this.userService.activeUser!;
            userData.email = response.user?.email;
            userData.fullname = response.user.fullName;
            userData.phoneNumber = response.user.phoneNumber;
            this.userService.activeUser = userData;
            this.dialogRef.close(true);
          }
        });
    } else {
      Object.keys(this.form.controls).forEach((controlName) => {
        const control = this.form.get(controlName);
        if (control) {
          control.markAsTouched();
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
    }
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
