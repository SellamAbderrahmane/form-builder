import { Component, OnInit, Input } from "@angular/core"
import { FormBuilder, FormControl, FormGroup } from "@angular/forms"
import { each } from "lodash"
import { debounceTime, distinctUntilChanged } from "rxjs"
import { SelectConfig } from "./select.interface"

@Component({
  selector: "select-options",
  template: `
    <form nz-form [formGroup]="formarray" nzLayout="vertical">
      <nz-form-item *ngFor="let control of controls; let i = index">
        <nz-form-control nzFlex="auto" class="option">
          <input nz-input placeholder="Option" [formControlName]="control" />
          <button nz-button nzSize="small" (click)="removeOption($event, control)">
            <span nz-icon nzType="minus-circle-o"></span>
          </button>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control [nzSpan]="24">
          <button nz-button nzType="dashed" nzBlock nzSize="small" (click)="addOption($event)">
            <span nz-icon nzType="plus"></span>
          </button>
        </nz-form-control>
      </nz-form-item>
    </form>
  `,
  styles: [
    `
      .option input {
        width: 85%;
        margin-right: 10px;
      }
    `,
  ],
})
export class SelectOptionsComponent implements OnInit {
  @Input() config: SelectConfig = {}
  @Input() formControl: FormControl = new FormControl()

  controls: Array<string> = []
  formarray: FormGroup<any>

  constructor(private fb: FormBuilder) {
    this.formarray = this.fb.group({})
  }

  ngOnInit() {
    if (this.formControl.value?.length > 0) {
      each(this.formControl.value, (item, index) => {
        const controlName = `option ${index + 1}`
        this.controls.push(controlName)
        this.formarray.addControl(controlName, this.fb.control<any>(item.value))
      })
    }

    this.formarray.valueChanges.pipe(debounceTime(150), distinctUntilChanged()).subscribe((v) => {
      const options = Object.entries(v).reduce((acc, [key, value]) => {
        if (value) acc.push({ key, value, label: value })

        return acc
      }, [])

      if (options?.length > 0) {
        this.formControl.setValue(options)
      }
    })
  }

  addOption(e: any): void {
    e.preventDefault()

    const controlName = `option ${this.controls.length + 1}`
    this.controls.push(controlName)
    this.formarray.addControl(controlName, this.fb.control<any>(null))
  }

  removeOption(e: any, controlname: string) {
    e.preventDefault()
    const index = this.controls.indexOf(controlname)
    this.controls.splice(index, 1)
    this.formarray.removeControl(controlname)
  }
}
