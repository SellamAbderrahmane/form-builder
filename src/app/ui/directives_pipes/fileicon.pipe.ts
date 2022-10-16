import { Pipe, PipeTransform } from '@angular/core';
import { ConfigService } from 'src/app/shared';
import { fileicons } from '../components';

@Pipe({
  name: 'fileicon',
})
export class FileIconPipe implements PipeTransform {
  constructor(private config: ConfigService) {}

  transform(value: any, ...args: any[]): any {
    return (
      this.config.state.host + (fileicons[value] || 'public/images/file.svg')
    );
  }
}
