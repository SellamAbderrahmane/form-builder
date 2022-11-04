import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { FormControl } from "@angular/forms"
import { SwitchConfig } from "./switch.interface"

@Component({
  selector: "dms-switch",
  template: `
    <nz-switch
      [nzSize]="config.size"
      [attr.disabled]="config.disabled"
      [formControl]="formControl"
      [nzLoading]="config.loading"
      (ngModelChange)="onChange.emit($event)"
      [nzCheckedChildren]="config.checkedChildren || checkedTemplate"
      [nzUnCheckedChildren]="config.unCheckedChildren || unCheckedTemplate"
      [ngStyle]="{ 'pointer-events': config.readOnly ? 'none' : 'auto' }"
    ></nz-switch>
    <ng-template #checkedTemplate><i nz-icon nzType="check"></i></ng-template>
    <ng-template #unCheckedTemplate><i nz-icon nzType="close"></i></ng-template>
  `,
})
export class SwitchComponent implements OnInit {
  @Input() config: SwitchConfig = {}
  @Input() formControl: FormControl = new FormControl()

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>()

  constructor() {}

  ngOnInit() {}
}
