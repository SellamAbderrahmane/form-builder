import { InjectionToken } from '@angular/core';

export const ABILITY = new InjectionToken<Ability>('Ability');
export interface RULE {
  type: string,
  able: string
}

export class Ability {
  rules: RULE[];

  constructor(rules: RULE[]) {
    this.rules = rules;
  }

  update(rules: RULE[]) {
    this.rules = rules;
  }
}
