import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, OnChanges } from "@angular/core"
import { FormControl } from "@angular/forms"
import { EditableConfig } from "./editable.interface"

import { defaultsDeep } from "lodash-es"

@Component({
  selector: "dms-editable",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [attr.contenteditable]="!(config.readOnly || config.disabled)" class="contenteditable" [ngStyle]="style">
      {{ config?.value }}
    </div>
  `,
})
export class EditableComponent implements OnInit, OnChanges {
  @Input() config: EditableConfig = {}
  @Input() formControl: FormControl = new FormControl()
  @Input() style: any = {}

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>()
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>()

  passwordVisible: boolean = false
  defaultConfig = {}

  constructor() {}

  ngOnInit() {
    this.config = defaultsDeep(this.config, this.defaultConfig)

    if (this.config.value && !this.formControl.value) {
      this.formControl.setValue(this.config.value)
    }

    if (this.config.disabled) {
      this.formControl.disable()
    }
  }

  ngOnChanges(): void {
    this.config = defaultsDeep(this.config, this.defaultConfig)
    this.config.disabled ? this.formControl.disable() : this.formControl.enable()
  }
}
