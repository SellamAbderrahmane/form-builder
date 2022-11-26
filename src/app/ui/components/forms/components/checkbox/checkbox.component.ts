import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core"
import { FormControl } from "@angular/forms"
import { defaultsDeep, merge } from "lodash-es"
import { CheckboxConfig } from "./chechbox.interface"

@Component({
  selector: "dms-checkbox",
  template: `
    <label
      nz-checkbox
      [formControl]="formControl"
      (ngModelChange)="onChange.emit($event)"
      *ngIf="!config.group; else checkboxgroup"
      [nzDisabled]="config.disabled"
      [ngStyle]="{ 'pointer-events': config.readOnly || config.disabled ? 'none' : 'auto' }"
    >
      {{ config.label }}
    </label>
    <ng-template #checkboxgroup>
      <nz-checkbox-group
        [formControl]="formControl"
        (ngModelChange)="onChange.emit($event)"
        [ngStyle]="{ 'pointer-events': config.readOnly || config.disabled ? 'none' : 'auto' }"
      ></nz-checkbox-group>
    </ng-template>
  `,
})
export class CheckboxComponent implements OnInit, OnChanges {
  @Input() config: CheckboxConfig
  @Input() formControl: FormControl = new FormControl()

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>()

  defaultConfig: any

  constructor() {}

  ngOnInit() {
    this.config = defaultsDeep(this.config, this.defaultConfig)
    this.formControl.setValue(this.config.value)

    if (this.config.disabled) {
      this.formControl.disable()
    }
  }

  ngOnChanges(): void {
    this.config = defaultsDeep(this.config, this.defaultConfig)
    this.config.disabled ? this.formControl.disable() : this.formControl.enable()

    if (this.config.value) {
      this.formControl.setValue(this.config.value)
    }
  }
}
