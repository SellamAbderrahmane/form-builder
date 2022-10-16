import { Pipe, PipeTransform } from '@angular/core';
import { ConfigService } from 'src/app/shared';

@Pipe({
  name: 'createby',
})
export class CreatebyPipe implements PipeTransform {
  constructor(private config: ConfigService) {}

  transform(createdBy: any): boolean {
    if (!this.config.state?.currentUser) {
      return false;
    }

    return this.config.state.currentUser.id === createdBy._id;
  }
}
