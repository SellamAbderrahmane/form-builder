import { ModuleWithProviders, NgModule } from '@angular/core';
import { Ability, ABILITY } from './ability.interface';
import { AbilityPipe } from './ability.pipe';
import { AbilityService } from './ability.service';

@NgModule({
  declarations: [AbilityPipe],
  exports: [AbilityPipe],
})
export class AbilityModule {
  static forRoot(rules: any[] = []): ModuleWithProviders<any> {
    return {
      ngModule: AbilityModule,
      providers: [
        AbilityService,
        {
          provide: ABILITY,
          useValue: new Ability(rules),
        }
      ],
    };
  }

  static forChild(rules: any[] = []): ModuleWithProviders<any> {
    return {
      ngModule: AbilityModule,
      providers: [],
    };
  }
}
