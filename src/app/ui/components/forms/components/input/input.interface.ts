import { TemplateRef } from '@angular/core';
import { FormItem } from '../../form.interface';

export interface InputConfig extends FormItem {
  group?: boolean;
  compact?: boolean;
  prefix?: string | TemplateRef<void>;
  suffixIcon?: string;
  autocomplete?: 'off' | 'on';
  autosize?: boolean | { minRows: number; maxRows: number };
  size?: 'large' | 'small' | 'default';
}
