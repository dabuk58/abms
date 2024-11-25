import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { filter } from 'rxjs';
import translationsPL from './../assets/i18n/pl.json';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ToastModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    private config: PrimeNGConfig,
    private translate: TranslateService,
    private msalAuthService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {
    this.translate.addLangs(['pl']);
    this.translate.setTranslation('pl', translationsPL);
    this.translate.setDefaultLang('pl');
    this.translate.use('pl');
    this.translate
      .get('primeng')
      .subscribe((res) => this.config.setTranslation(res));
  }

  ngOnInit(): void {
    this.msalAuthService.handleRedirectObservable().subscribe();
  }

  initializeMicrosoftLogin(): void {
    this.msalAuthService.handleRedirectObservable().subscribe();

    this.manageAuthEvents();
  }

  manageAuthEvents(): void {
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe(() => {
        this.setActiveAccount();
      });
  }

  setActiveAccount(): void {
    const activeAccount = this.msalAuthService.instance.getActiveAccount();
    const accounts = this.msalAuthService.instance.getAllAccounts();

    if (!activeAccount && accounts.length > 0) {
      this.msalAuthService.instance.setActiveAccount(accounts[0]);
    }
  }
}
