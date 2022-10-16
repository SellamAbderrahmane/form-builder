import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormConfig, FormField } from './form.interface';
import { merge } from 'lodash-es';

@Component({
  selector: 'dms-form',
  template: `
    <form
      nz-form
      [formGroup]="formGroup"
      [nzLayout]="config.layout"
      [nzNoColon]="config.noColon"
      [nzDisableAutoTips]="config.disableAutoTips"
      [nzAutoTips]="config.autoTips"
      (ngSubmit)="(submit)"
      class="container"
    >
      <div class="body">
        <ng-template [ngTemplateOutlet]="body || bodyTmp"></ng-template>
        <ng-template #bodyTmp>
          <nz-row [nzGutter]="[6, 6]">
            <ng-container *ngFor="let field of fields">
              <nz-col
                [nzXs]="24"
                [nzSm]="24"
                [nzMd]="field.span || 24"
                [nzLg]="field.span || 12"
                [nzXl]="field.span || 12"
                *ngIf="
                  field.hideField != null
                    ? !field.hideField(this.formGroup.value)
                    : true
                "
              >
                <nz-form-item>
                  <nz-form-label
                    nzSpan="24"
                    *ngIf="field.label"
                    [nzRequired]="formGroup.get(field.key)?.errors?.required"
                    [nzFor]="field.key"
                  >
                    <span translate>{{ field.label }}</span>
                  </nz-form-label>
                  <nz-form-control
                    [nzExtra]="field.extra"
                    [nzErrorTip]="field.errorTip"
                    [nzSuccessTip]="field.successTip"
                    [nzWarningTip]="field.warningTip"
                    [nzHasFeedback]="field.hasFeedBack"
                    [nzValidatingTip]="field.validatingTip"
                    [nzValidateStatus]="field.validateStatus"
                  >
                    <ng-container
                      form-field
                      [field]="field"
                      ngDefaultControl
                      [formChange]="formChange"
                      [model]="formGroup.value"
                      [formControl]="initController(field)"
                    ></ng-container>
                  </nz-form-control>
                </nz-form-item>
              </nz-col>
            </ng-container>
          </nz-row>
        </ng-template>
      </div>
      <div class="footer" *ngIf="showFooter">
        <nz-row [nzJustify]="'end'" [nzAlign]="'middle'">
          <ng-template [ngTemplateOutlet]="footer || footerTmp"></ng-template>
          <ng-template #footerTmp>
            <button nzType="primary" nz-button>
              {{ 'SUBMIT' | translate }}
            </button>
          </ng-template>
        </nz-row>
      </div>
    </form>
  `,
  styles: [
    `
      .container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        /* height: 100%; */
        min-width: 100%;
      }

      .body {
        flex: auto;
      }
      .footer {
        /* height: 35px; */
        margin-top: 5px;
      }
    `,
  ],
})
export class FormComponent implements OnInit {
  @Input() config: FormConfig = {};
  @Input() fields: FormField[] = [];
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() footer: TemplateRef<any> = null;
  @Input() body: TemplateRef<any> = null;
  @Input() showFooter: boolean = true;
  @Input() formChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    this.config = merge(this.config, {
      layout: 'vertical',
      noColon: false,
      itemGroup: [],
      autoTips: this.autoTips,
    });
  }

  initController(field: FormField): FormControl {
    if (!this.formGroup.get(field.key))
      this.formGroup.addControl(field.key, new FormControl(null));
    return this.formGroup.get(field.key) as FormControl;
  }

  autoTips: Record<string, Record<string, string>> = {
    'zh-cn': {
      required: '必填项',
      email: '邮箱格式不正确',
    },
    en: {
      required: 'Input is required',
      email: 'The input is not valid email',
    },
    fr: {
      required: 'Ce champ est requis',
      email: "L'email n'est pas valide",
    },
  };

  // @HostListener('window:resize', ['$event'])
  // onResize(event: any) {
  //   if (event.target.innerWidth <= 768) {
  //     console.log(event.target.innerWidth);
  //     this.defaultSpan = 24;
  //     return;
  //   }

  //   this.defaultSpan = undefined;
  // }
}
