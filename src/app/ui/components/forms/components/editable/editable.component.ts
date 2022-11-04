import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { FormControl } from "@angular/forms"
import { EditableConfig } from "./editable.interface"

import { merge } from "lodash-es"

@Component({
  selector: "dms-editable",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div contenteditable class="contenteditable" [attr.readonly]="config.readOnly" [ngStyle]="style">
      {{ config?.value }}
    </div>
  `,
})
export class EditableComponent implements OnInit {
  @Input() config: EditableConfig = {}
  @Input() formControl: FormControl = new FormControl()
  @Input() style: any = {}

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>()
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>()

  passwordVisible: boolean = false

  constructor() {}

  ngOnInit() {
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

    this.style = merge({ "pointer-events": this.config.readOnly ? "none" : "auto" }, this.style)

    if (this.config.value) {
      this.formControl.setValue(this.config.value)
    }

    if (this.config.disabled) {
      this.formControl.disable()
    }
  }
}
