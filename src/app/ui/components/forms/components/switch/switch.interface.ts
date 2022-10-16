import { TemplateRef } from '@angular/core';
import { NzSizeDSType } from 'ng-zorro-antd/core/types';
import { FormItem } from '../../form.interface';

export interface SwitchConfig extends FormItem {
  checkedChildren?: string | TemplateRef<void>;
  unCheckedChildren?: string | TemplateRef<void>;
  size?: NzSizeDSType;
}
