import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, OnChanges } from "@angular/core"
import { FormControl } from "@angular/forms"
import { InputConfig } from "./input.interface"

import { merge } from "lodash-es"

@Component({
  selector: "dms-input",
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
      <ng-template #suffixTemplate>
        <i nz-icon [nzType]="passwordVisible ? 'eye-invisible' : 'eye'" class="p-icon" (click)="passwordVisible = !passwordVisible"></i>
      </ng-template>
      <ng-template [ngTemplateOutlet]="inputtemp"></ng-template>
    </nz-input-group>

    <ng-template #inputtemp [ngSwitch]="config.type">
      <nz-input-number
        *ngSwitchCase="'number-input'"
        [formControl]="formControl"
        (ngModelChange)="(onChange)"
        [nzParser]="config.parser"
      ></nz-input-number>
      <textarea
        nz-input
        *ngSwitchCase="'textArea'"
        [nzAutosize]="config.autosize"
        [formControl]="formControl"
        (ngModelChange)="(onChange)"
        [attr.disabled]="config.disabled"
        [attr.readonly]="config.readOnly ? true : null"
        [placeholder]="config.placeholder | translate"
        [autocomplete]="config.autocomplete"
        [ngStyle]="{ 'pointer-events': config.readOnly ? 'none' : 'auto' }"
      ></textarea>
      <input
        nz-input
        *ngSwitchDefault
        [nzSize]="config.size"
        [type]="passwordVisible ? 'text' : config.type"
        [name]="config.name"
        [placeholder]="config.placeholder | translate"
        [formControl]="formControl"
        (ngModelChange)="(onChange)"
        [pattern]="config.pattern"
        [autocomplete]="config.autocomplete"
        [attr.readonly]="config.readOnly ? true : null"
        [attr.disabled]="config.disabled"
        [ngStyle]="{ 'pointer-events': config.readOnly ? 'none' : 'auto' }"
      />
    </ng-template>
  `,
})
export class InputComponent implements OnInit, OnChanges {
  @Input() config: InputConfig = {}
  @Input() formControl: FormControl = new FormControl()

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>()

  passwordVisible: boolean = false

  constructor() {}

  ngOnChanges(): void {
    this.config = merge(
      {
        name: "default",
        placeholder: "",
        group: false,
        disabled: false,
        type: "text",
        nzAutosize: true,
        autocomplete: "off",
      },
      this.config
    )
  }

  ngOnInit() {
    if (this.config.value) {
      this.formControl.setValue(this.config.value)
    }

    if (this.config.disabled) {
      this.formControl.disable()
    }
  }
}
