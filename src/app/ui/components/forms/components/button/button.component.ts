import { Component, Input, OnInit } from '@angular/core';
import { ButtonConfig } from './button.interface';

import { isFunction, result } from 'lodash-es';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'dms-button',
  template: `
    <ng-container *ngFor="let bt of btns">
      <button
        *ngIf="!isBtnHide(bt)"
        nz-button
        [ngClass]="bt.class"
        (click)="onClick(bt)"
        [disabled]="isBtnDisable(bt)"
        [nzSize]="bt.size"
        [nzType]="bt.type"
        [nzBlock]="bt.block"
        [nzGhost]="bt.ghost"
        [nzLoading]="bt.loading"
        [nzShape]="bt.shape"
        [nzDanger]="bt.danger"
        [nzTooltipTitle]="bt.tooltip?.tooltipTitle | translate"
        [nzTooltipPlacement]="bt.tooltip?.tooltipPlacement || 'left'"
        [nzTooltipTrigger]="bt.tooltip?.tooltipTrigger || 'hover'"
        [nzPopconfirmTitle]="(bt.popconfirm || {})?.popconfirmTitle | translate"
        [nzPopconfirmPlacement]="(bt.popconfirm || {})?.popconfirmPlacement"
        [nzPopconfirmTrigger]="(bt.popconfirm || {})?.popconfirmTrigger"
        [nzCancelText]="(bt.popconfirm || {}).cancelText"
        [nzOkText]="(bt.popconfirm || {})?.okText"
        [nzOkType]="(bt.popconfirm || {})?.okType"
        [nzCondition]="(bt.popconfirm || {})?.condition"
        [nzIcon]="(bt.popconfirm || {})?.icon"
        (nzOnCancel)="onCancel($event, bt)"
        (nzOnConfirm)="onConfirm($event, bt)"
        nz-tooltip
        nz-popconfirm
      >
        <i
          *ngIf="bt.icon"
          [ngClass]="bt.icon.class"
          [ngStyle]="bt.icon.style"
          nz-icon
          [nzType]="bt.icon.type"
          [nzRotate]="bt.icon.rotate"
          [nzTheme]="bt.icon.theme"
          [nzSpin]="bt.icon.spin"
          [nzTwotoneColor]="bt.icon.twotoneColor"
          [nzIconfont]="bt.icon.iconfont"
        ></i>
        <span *ngIf="bt.text != null && bt.text != ''" translate>{{ bt.text }}</span>
      </button>
    </ng-container>
  `,
})
export class ButtonComponent implements OnInit {
  @Input() btn: ButtonConfig;
  @Input() btns: ButtonConfig[] = [];
  @Input() data?: any = {};
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    if (this.btn) {
      this.btns = [this.btn];
    }
  }

  onClick(btn) {
    if (isFunction(btn.onClick)) {
      btn.onClick(this.data);
    }
  }

  onCancel(event: any, btn: ButtonConfig) {
    // if ((btn.popconfirm || {}).onCancel) {
    //   (btn.popconfirm || {}).onCancel();
    // }
  }

  onConfirm(event: any, btn: ButtonConfig) {
    // if ((btn.popconfirm || {}).onConfirm) {
    //   (btn.popconfirm || {}).onConfirm(data);
    // }
  }

  isBtnHide(btn: ButtonConfig) {
    return result(btn, 'isHide');
  }

  isBtnDisable(btn: ButtonConfig) {
    return btn.disabled ?? result(btn, 'isDisable');
  }
}
