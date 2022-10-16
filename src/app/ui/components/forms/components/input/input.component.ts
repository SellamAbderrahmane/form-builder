import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputConfig } from './input.interface';

import { merge } from 'lodash-es';

@Component({
  selector: 'dms-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nz-input-group
      [nzAddOnBefore]="config.addOnBefore"
      [nzAddOnAfter]="config.addOnAfter"
      [nzPrefix]="config.prefix"
      [nzSearch]="config.group"
      [nzPrefixIcon]="config.prefixIcon"
      [nzSuffixIcon]="config.suffixIcon"
      [nzSuffix]="config.type == 'password' ? suffixTemplate : config.suffix"
      [nzCompact]="config.compact"
      *ngIf="config.group; else inputtemp"
    >
      <ng-template [ngTemplateOutlet]="inputtemp"></ng-template>
    </nz-input-group>

    <ng-template #inputtemp>
      <input
        nz-input
        *ngIf="config.type !== 'textArea'"
        [nzSize]="config.size"
        [type]="passwordVisible ? 'text' : config.type"
        [name]="config.name"
        [placeholder]="config.placeholder | translate"
        [formControl]="formControl"
        (ngModelChange)="(onChange)"
        [autocomplete]="config.autocomplete"
        [attr.disabled]="config.disabled"
      />

      <textarea
        nz-input
        [nzAutosize]="config.autosize"
        [formControl]="formControl"
        (ngModelChange)="(onChange)"
        [attr.disabled]="config.disabled"
        [placeholder]="config.placeholder | translate"
        [autocomplete]="config.autocomplete"
        *ngIf="config.type === 'textArea'"
      ></textarea>
    </ng-template>

    <ng-template #suffixTemplate>
      <i
        nz-icon
        [nzType]="passwordVisible ? 'eye-invisible' : 'eye'"
        class="p-icon"
        (click)="passwordVisible = !passwordVisible"
      ></i>
    </ng-template>
  `,
})
export class InputComponent implements OnInit {
  @Input() config: InputConfig = {};
  @Input() formControl: FormControl = new FormControl();

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  passwordVisible: boolean = false;

  constructor() {}

  ngOnInit() {
    this.config = merge(
      {
        name: 'default',
        placeholder: '',
        group: false,
        disabled: false,
        type: 'text',
        nzAutosize: true,
        autocomplete: 'off',
      },
      this.config
    );

    if (this.config.value) {
      this.formControl.setValue(this.config.value);
    }

    if (this.config.disabled) {
      this.formControl.disable();
    }
  }
}