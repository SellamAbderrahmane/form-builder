import { Component, Input, OnInit } from '@angular/core';
import { TransferConfig } from './transfer.interface';
import { merge } from 'lodash-es';

@Component({
  selector: 'dms-transfer',
  template: `
    <nz-transfer
      [nzDataSource]="config.dataSource"
      [nzListStyle]="{ 'width.px': 300, 'height.px': 300 }"
      [nzRender]="render"
      (nzSelectChange)="select($event)"
      (nzChange)="change($event)"
    >
      <ng-template #render let-item>
        <i nz-icon nzType="{{ item.icon }}"></i> {{ item.title }}
      </ng-template>
      <ng-template #render let-item>
      </ng-template>
    </nz-transfer>
  `,
})
export class TransferComponent implements OnInit {
  @Input() config: TransferConfig;

  constructor() {}

  ngOnInit() {
    this.config = merge(this.config, {
      title: '',
      dataSource: [],
    });
  }

  select(e) {
    console.log(e);
  }

  change(e) {
    console.log(e);
  }
}
