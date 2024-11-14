import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoaderEnum } from '../enums/loader.enum';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaders = new Map<LoaderEnum, BehaviorSubject<boolean>>();

  constructor() {
    (Object.values(LoaderEnum) as LoaderEnum[]).forEach((loader) => {
      this.loaders.set(loader, new BehaviorSubject<boolean>(false));
    });
  }

  setActive(loader: LoaderEnum): void {
    this.loaders.get(loader)?.next(true);
  }

  setInactive(loader: LoaderEnum): void {
    this.loaders.get(loader)?.next(false);
  }

  isActive(loader: LoaderEnum): Observable<boolean> {
    return this.loaders.get(loader)?.asObservable()!;
  }
}
