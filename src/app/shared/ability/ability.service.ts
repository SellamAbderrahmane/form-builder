import { Inject, Injectable } from '@angular/core';
import { Ability, ABILITY, RULE } from './ability.interface';

@Injectable({
  providedIn: 'root',
})
export class AbilityService {
  constructor(@Inject(ABILITY) private ability: Ability) {}

  update(rules: RULE[]) {
    this.ability.update(rules);
  }

  can(type: string, able: string) {
    if (!this.ability?.rules) {
      return false;
    }

    return (
      this.ability.rules.findIndex(
        (item) =>
          item.able === 'all' || (item.type === type && item.able === able)
      ) !== -1
    );
  }
}
