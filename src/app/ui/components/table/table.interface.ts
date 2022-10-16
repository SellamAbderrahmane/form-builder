import { TemplateRef, Type } from '@angular/core';
import {
  NzTableLayout,
  NzTablePaginationPosition,
  NzTablePaginationType,
  NzTableQueryParams,
  NzTableSize,
} from 'ng-zorro-antd/table';
import { ButtonConfig } from '../forms';

export type TableTemplate = Type<ITableCellComponent<any>> | TemplateRef<any>;

export interface ITableCellComponent<T> {
  init(params: T): void;
}

export interface TableDataSet {
  key: number;
  expandTemp?: boolean;
  expand?: boolean;
  disabled?: boolean;
  [key: string]: any;
}

export interface TableSetting {
  bordered?: boolean;
  pagination?: boolean;
  sizeChanger?: boolean;
  expandable?: boolean;
  checkbox?: boolean;
  fixHeader?: boolean;
  noResult?: boolean;
  ellipsis?: boolean;
  breakWord?: boolean;
  simple?: boolean;
  size?: NzTableSize;
  tableScroll?: 'scroll' | 'unset' | 'fixed';
  title?: string | TemplateRef<any>;
  header?: string | TemplateRef<any>;
  footer?: string | TemplateRef<any>;
  tableLayout?: NzTableLayout;
  position?: NzTablePaginationPosition;
  paginationType?: NzTablePaginationType;
  actions?: ButtonConfig[];
  onRowSelected?(rows: any[]): void;
  pageSizeChange?(index: number): void;
  pageIndexChange?(index: number): void;
  currentPageDataChange?(data: readonly TableDataSet[]): void;
  queryParams?(params: NzTableQueryParams): void;
}

export interface TableHeadConfig {
  field: string;
  headerName: string;

  width?: string;
  checked?: boolean;
  disabled?: boolean;
  ellipsis?: boolean;
  fixedLeft?: boolean;
  fixedRight?: boolean;
  cellRender?: TableTemplate;
  align?: 'left' | 'right' | 'center';
  actions?: ButtonConfig[],
  checkedChange?: (v: boolean) => void;
}
