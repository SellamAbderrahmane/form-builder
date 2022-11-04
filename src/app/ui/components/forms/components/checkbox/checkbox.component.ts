import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { FormControl } from "@angular/forms"
import { merge } from "lodash-es"
import { CheckboxConfig } from "./chechbox.interface"

@Component({
  selector: "dms-checkbox",
  template: `
    <label
      nz-checkbox
      [formControl]="formControl"
      (ngModelChange)="onChange.emit($event)"
      *ngIf="!config.group; else checkboxgroup"
      [ngStyle]="{ 'pointer-events': config.readOnly ? 'none' : 'auto' }"
    >
      {{ config.label }}
    </label>
    <ng-template #checkboxgroup>
      <nz-checkbox-group
        [formControl]="formControl"
        (ngModelChange)="onChange.emit($event)"
        [ngStyle]="{ 'pointer-events': config.readOnly ? 'none' : 'auto' }"
      ></nz-checkbox-group>
    </ng-template>
  `,
})
export class CheckboxComponent implements OnInit {
  @Input() config: CheckboxConfig = null
  @Input() formControl: FormControl = new FormControl()

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>()
  constructor() {}

  ngOnInit() {
    // this.config = merge(
    //   {
    //     value: false,
    //   },
    //   this.config
    // )

    this.formControl.setValue(this.config.value)
  }
}
