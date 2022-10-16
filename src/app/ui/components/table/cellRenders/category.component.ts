import { Component } from '@angular/core';
import * as _ from 'lodash-es';
import { ITableCellComponent } from '../table.interface';

@Component({
  selector: 'tags-cell',
  template: `
    <ng-container *ngFor="let option of options">
      <nz-tag>{{ option.label }}:{{ option.category }}</nz-tag>
    </ng-container>
  `,
})
export class CategoryRenderer implements ITableCellComponent<any> {
  options: { label: string; category: string }[] = [];

  init(params: any): void {
    this.options = params.value;
  }
}
