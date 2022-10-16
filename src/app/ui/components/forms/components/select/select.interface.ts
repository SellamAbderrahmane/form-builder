import { EventEmitter, TemplateRef } from '@angular/core';
import { NzOptionComponent, NzSelectSizeType } from 'ng-zorro-antd/select';
import { FormItem } from '../../form.interface';

export interface SelectConfig extends FormItem {
  open?: boolean;
  showArrow?: boolean;
  showSearch?: boolean;
  loading?: boolean;
  autoClearSearchValue?: boolean;
  selectMode?: 'default' | 'multiple' | 'tags';
  size?: NzSelectSizeType;
  suffixIcon?: TemplateRef<any> | string;
  removeIcon?: TemplateRef<any> | string;
  clearIcon?: TemplateRef<any>;
  customTemplate?: TemplateRef<{ $implicit: NzOptionComponent }>;
  onSearch?: (v: any, field: SelectConfig) => void;
  selectGroup?: Array<{
    label: string;
    options?: Array<{
      label: string;
      value: any;
      disabled?: boolean;
      hide?: boolean;
      groupLabel?: string | TemplateRef<any>;
    }>;
  }>;
  options?: Array<{
    label: string;
    value: any;
    disabled?: boolean;
    hide?: boolean;
    groupLabel?: string | TemplateRef<any>;
  }>;
  maxTagCount?: number;
  menuItemSelectedIcon?: TemplateRef<any>;
}
