import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CheckboxConfig } from './chechbox.interface';

// import { merge } from 'lodash-es';

@Component({
  selector: 'dms-checkbox',
  template: `
    <nz-checkbox-group
      (ngModelChange)="onChange.emit($event)"
      [formControl]="formControl"
    ></nz-checkbox-group>
  `,
})
export class CheckboxComponent implements OnInit {
  @Input() config: CheckboxConfig = null;
  @Input() group: CheckboxConfig[] = [];
  @Input() formControl: FormControl = new FormControl();

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {
    if (this.config) {
      this.group.push(this.config);
    }
    this.formControl.setValue(this.group);
  }
}
