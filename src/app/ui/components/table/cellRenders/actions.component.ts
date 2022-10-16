import { Component } from '@angular/core';
import * as _ from 'lodash-es';
import { ButtonConfig } from '../../forms';
import { ITableCellComponent } from '../table.interface';

@Component({
  selector: 'action-cell',
  template: ` <dms-button [btns]="actions" [data]="params.data"></dms-button> `,
})
export class ActionRenderer implements ITableCellComponent<any> {
  public params: any;
  public actions: ButtonConfig[] = [];

  init(params: any): void {
    this.params = params;

    if (params && params.colDef) {
      this.actions = _.map(params.colDef.actions || [], (btn: ButtonConfig) => {
        btn.type = btn.type || 'text';
        btn.size = btn.size || 'small';
        btn.isHide =
          btn.isHide ||
          function () {
            return false;
          };
        return btn;
      });
    }
  }

  refresh(): boolean {
    return false;
  }

  isBtnHide(btn: ButtonConfig) {
    return _.result(btn, 'isHide');
  }

  isBtnDisable(btn: ButtonConfig) {
    return _.result(btn, 'isDisable');
  }
}
