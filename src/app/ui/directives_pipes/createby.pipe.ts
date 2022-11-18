import { Pipe, PipeTransform } from '@angular/core';
import { ConfigService } from 'src/app/shared';

@Pipe({
  name: 'createby',
})
export class CreatebyPipe implements PipeTransform {
  constructor(private config: ConfigService) {}

  transform(createdBy: any, currentUser: any): boolean {
    if (!currentUser) {
      return false;
    }

    return currentUser.id === createdBy._id;
  }
}
