import { EventEmitter, Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SelectConfig } from './select.interface';
import { defaultsDeep } from 'lodash-es';

@Component({
  selector: 'dms-select',
  template: `
    <nz-select
      [formControl]="formControl"
      [nzAllowClear]="config.allowClear"
      (ngModelChange)="onChange.emit($event)"
      [nzPlaceHolder]="config.placeholder | translate"
      [nzShowArrow]="config.showArrow"
      [nzShowSearch]="config.showSearch"
      [nzAutoClearSearchValue]="config.autoClearSearchValue"
      [nzAutoFocus]="config.autoFocus"
      [nzBorderless]="config.borderless"
      [nzClearIcon]="config.clearIcon"
      [nzCustomTemplate]="config.customTemplate"
      [nzDisabled]="config.disabled"
      [nzDropdownClassName]="config.dropdownClassName"
      [nzLoading]="config.loading"
      [nzMaxTagCount]="config.maxTagCount"
      [nzMenuItemSelectedIcon]="config.menuItemSelectedIcon"
      (nzOnSearch)="config.onSearch && config.onSearch($event, config)"
      [nzOpen]="config.open"
      [nzSize]="config.size"
      [nzSuffixIcon]="config.suffixIcon"
      [nzMode]="config.selectMode"
      [ngStyle]="{ 'pointer-events': config.readOnly ? 'none' : 'auto' }"
    >
      <ng-container *ngIf="config.selectGroup?.length <= 0; else temp">
        <ng-container *ngFor="let option of config.options">
          <nz-option
            [nzValue]="option.value"
            [nzLabel]="
              config.translate === 'yes'
                ? (option.label | translate)
                : option.label
            "
            [nzHide]="option.hide"
            [nzDisabled]="option.disabled"
          ></nz-option>
        </ng-container>
      </ng-container>
      <ng-template #temp>
        <ng-container *ngFor="let group of config.selectGroup">
          <nz-option-group [nzLabel]="group.label">
            <nz-option
              *ngFor="let option of group.options"
              [nzValue]="option.value"
              [nzLabel]="
                config.translate === 'yes'
                  ? (option.label | translate)
                  : option.label
              "
              [nzHide]="option.hide"
              [nzDisabled]="option.disabled"
            ></nz-option>
          </nz-option-group>
        </ng-container>
      </ng-template>
    </nz-select>
  `,
  styles: [
    `
      nz-select {
        width: 100%;
      }
      nz-select input {
        border: none !important;
      }
    `,
  ],
})
export class SelectComponent implements OnInit {
  @Input() config: SelectConfig = {};
  @Input() formControl: FormControl = new FormControl();

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    this.config = defaultsDeep(this.config, {
      showArrow: true,
      showSearch: true,
      selectMode: 'default',
      allowClear: true,
      translate: 'yes',
    });
  }
}
