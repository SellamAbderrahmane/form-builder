import { TemplateRef } from '@angular/core';
import { NzDatePickerI18nInterface } from 'ng-zorro-antd/i18n';
import { FormItem } from '../../form.interface';

export interface DateConfig extends FormItem {
  showTime?: boolean;
  disabledDate?(current: Date): boolean;
  format?: string;
  inputReadOnly?: boolean;
  locale?: NzDatePickerI18nInterface;
  dateMode?: 'date' | 'week' | 'month' | 'year';
  popupStyle?: object;
  size?: 'large' | 'small' | 'default';
  renderExtraFooter?:
    | TemplateRef<any>
    | string
    | (() => TemplateRef<any> | string);
}
