import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { FormControl } from "@angular/forms"
import { DateConfig } from "./date.interface"
import { merge } from "lodash-es"

@Component({
  selector: "dms-date",
  template: `
    <nz-date-picker
      [nzRenderExtraFooter]="config.renderExtraFooter"
      [nzShowTime]="config.showTime"
      [nzAutoFocus]="config.autoFocus"
      [nzAllowClear]="config.allowClear"
      [nzDefaultPickerValue]="config.value"
      [nzDisabled]="config.disabled"
      [nzDisabledDate]="config.disabledDate"
      [nzDropdownClassName]="config.dropdownClassName"
      [nzFormat]="config.format"
      [nzInputReadOnly]="config.readOnly"
      [nzLocale]="config.locale"
      [nzMode]="config.dateMode"
      [nzPlaceHolder]="config.placeholder | translate"
      [nzPopupStyle]="config.popupStyle"
      [nzSize]="config.size"
      [nzSuffixIcon]="config.suffix"
      (ngModelChange)="onChange.emit($event)"
      [formControl]="formControl"
      style="width:100%"
      [ngStyle]="{ 'pointer-events': config.readOnly || config.disabled ? 'none' : 'auto' }"
    ></nz-date-picker>
  `,
})
export class DateComponent implements OnInit {
  @Input() config: DateConfig = {}
  @Input() formControl: FormControl = new FormControl()

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>()

  constructor() {}

  ngOnInit() {
    this.config = merge(this.config, {
      allowClear: true,
      format: "dd/MM/yyyy",
    })
  }
}
