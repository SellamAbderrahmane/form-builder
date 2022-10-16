import { Pipe, PipeTransform } from '@angular/core';
import { AbilityService } from './ability.service';

@Pipe({
  name: 'can',
})
export class AbilityPipe implements PipeTransform {
  constructor(private service: AbilityService) {}

  transform(type: string, able: string): boolean {
    return this.service.can(type, able);
  }
}
