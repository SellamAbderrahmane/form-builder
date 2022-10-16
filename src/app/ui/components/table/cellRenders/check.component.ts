import { Component } from '@angular/core';
import * as _ from 'lodash-es';
import { ITableCellComponent } from '../table.interface';

@Component({
  selector: 'check-cell',
  template: ` <i nz-icon [nzType]="type" nzTheme="outline"></i> `,
})
export class CheckRenderer implements ITableCellComponent<any> {
  type = 'close';

  init(params: any): void {
    if (params.value) {
      this.type = 'check';
    }
  }
}
