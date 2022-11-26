import { TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';

import {
  CheckboxComponent,
  CheckboxConfig,
  CheckboxOptionsComponent,
  DateComponent,
  DateConfig,
  EditableComponent,
  InputComponent,
  InputConfig,
  SelectComponent,
  SelectConfig,
  SwitchComponent,
  SwitchConfig,
} from './components';
import { SelectOptionsComponent } from './components/select/options.component';

export interface FormConfig {
  layout?: 'horizontal' | 'vertical' | 'inline';
  noColon?: boolean;
  autoTips?: Record<string, Record<string, string>>;
  disableAutoTips?: boolean;
}

export declare type INPUTS =
  | 'text'
  | 'number'
  | 'password'
  | 'phone'
  | 'radio'
  | 'checkbox'
  | 'slider'
  | 'select'
  | 'selectOptions'
  | 'textArea'
  | 'date'
  | 'editable'
  | 'switch';

export type FormField = FormItem &
  InputConfig &
  SwitchConfig &
  SelectConfig &
  DateConfig &
  (CheckboxConfig | CheckboxConfig[]);

export interface FormItem {
  type?: INPUTS | ((model: any) => INPUTS);
  span?: number;
  hideField?(field: any): boolean;
  changeType?(type: any): void;
  label?: string;
  key?: string;
  name?: string;
  value?: any;
  disabled?: boolean;
  autoFocus?: boolean;
  borderless?: boolean;
  allowClear?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  placeholder?: string;
  suffix?: string | TemplateRef<any>;
  prefixIcon?: string;
  addOnAfter?: string | TemplateRef<void>;
  addOnBefore?: string | TemplateRef<void>;
  dropdownClassName?: string;
  onChange?(value: any): any;
  itemGroup?: FormField[];

  validateStatus?: 'success' | 'warning' | 'error' | 'validating' | FormControl;
  hasFeedBack?: boolean;
  extra?: string | TemplateRef<void>;
  translate?: 'no' | 'yes';
  successTip?: string | TemplateRef<{ $implicit: FormControl }>;
  warningTip?: string | TemplateRef<{ $implicit: FormControl }>;
  errorTip?: string | TemplateRef<{ $implicit: FormControl }>;
  validatingTip?: string | TemplateRef<{ $implicit: FormControl }>;
}

export const WRAPPERS: { [T: string]: any } = {
  text: InputComponent,
  number: InputComponent,
  date: DateComponent,
  datetime: DateComponent,
  password: InputComponent,
  phone: InputComponent,
  editable: EditableComponent,
  checkbox: CheckboxComponent,
  checkboxOptions: CheckboxOptionsComponent,
  select: SelectComponent,
  selectOptions: SelectOptionsComponent,
  switch: SwitchComponent,
  // radio: FormInputComponent
  textArea: InputComponent,
  // slider: FormInputComponent,
};
