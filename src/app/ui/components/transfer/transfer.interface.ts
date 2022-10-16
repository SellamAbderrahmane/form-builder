import { EventEmitter, TemplateRef } from '@angular/core';
import {
  TransferCanMove,
  TransferChange,
  TransferItem,
} from 'ng-zorro-antd/transfer';
import { Observable } from 'rxjs';

export interface TransferConfig {
  type?: 'table' | 'deafult' | 'tree';
  dataSource?: TransferItem[];
  disabled?: boolean;
  titles?: string[];
  operations?: string[];
  itemUnit?: string;
  itemsUnit?: string;
  renderList?: Array<TemplateRef<void> | null>;
  render?: TemplateRef<void>;
  footer?: TemplateRef<void>;
  showSearch?: boolean;
  filterOption?(inputValue: string, item: TransferItem): boolean;
  searchPlaceholder?: string;
  notFoundContent?: string;
  canMove?(arg: TransferCanMove): Observable<TransferItem[]>;
  selectedKeys?: string[];
  targetKeys?: string[];
  change?: EventEmitter<TransferChange>;
  searchChange?: EventEmitter<TransferChange>;
  selectChange?: EventEmitter<TransferChange>;
}
