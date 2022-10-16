import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { en_US, fr_FR, NZ_I18N } from 'ng-zorro-antd/i18n';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UiModule } from './ui/ui.module';
import { AppRoutingModule } from './app-routing.module';
import { AbilityModule } from './shared/ability/ability.module';

import { StateModule } from './state';
import { defaultConfig } from './shared/config';
import { Ability, ABILITY } from './shared/ability/ability.interface';
import {
  ConfigService,
  HttpService,
  SHARED_SERVICES,
  TranslateService,
} from './shared';

import { AppComponent } from './app.component';
import { LayoutComponent } from './ui/layouts/layout.component';

@NgModule({
  declarations: [AppComponent, LayoutComponent],
  imports: [
    UiModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AbilityModule.forChild(),
    StateModule.forRoot({
      selector: 'config',
      state: defaultConfig,
    }),
    TranslateModule.forRoot({
      defaultLanguage: 'fr-FR',
      loader: {
        provide: TranslateLoader,
        useClass: TranslateService,
        deps: [HttpService],
      },
    }),
  ],
  providers: [
    ...SHARED_SERVICES,
    {
      multi: true,
      deps: [ConfigService],
      provide: APP_INITIALIZER,
      useFactory: (config: ConfigService) => async () => await config.init(),
    },
    {
      provide: NZ_I18N,
      deps: [LOCALE_ID],
      useFactory: (localId: string) => {
        switch (localId) {
          case 'fr':
            return fr_FR;
          default:
            return en_US;
        }
      },
    },
    {
      provide: ABILITY,
      useValue: new Ability([]),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
