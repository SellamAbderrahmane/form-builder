import { EventEmitter, TemplateRef } from '@angular/core';
import {
  NzFormatBeforeDropEvent,
  NzFormatEmitEvent,
  NzTreeNode,
  NzTreeNodeOptions,
} from 'ng-zorro-antd/tree';
import { Observable } from 'rxjs';

export interface TreeConfig {
  title?: string;
  blockNode?: boolean;
  checkable?: boolean;
  showExpand?: boolean;
  showLine?: boolean;
  showIcon?: boolean;
  showSearch?: boolean;
  asyncData?: boolean;
  draggable?: boolean;
  hideUnMatched?: boolean;
  multiple?: boolean;
  checkStrictly?: boolean;
  expandAll?: boolean;
  expandKeys?: string[];
  selectedKeys?: string[];
  checkedKeys?: string[];
  searchValue?: string;
  height?: string;
  itemSize?: number;
  treeTemplate?: TemplateRef<{ $implicit: NzTreeNode }>;
  searchFun?(node: NzTreeNodeOptions): boolean;
  beforeDrop?: (confirm: NzFormatEmitEvent) => Observable<boolean>;
  click?(item: any): void;
  dbClick?(item: any): void;
  expandChange?(node: NzTreeNode): any;
  searchValueChange?: EventEmitter<NzFormatEmitEvent>;
  onDragStart?: EventEmitter<NzFormatEmitEvent>;
  onDragEnter?: EventEmitter<NzFormatEmitEvent>;
  onDragOver?: EventEmitter<NzFormatEmitEvent>;
  onDragLeave?: EventEmitter<NzFormatEmitEvent>;
  onDragEnd?: EventEmitter<NzFormatEmitEvent>;
  onDrop?: EventEmitter<NzFormatEmitEvent>;
  actions?: Array<{
    class?: string;
    icon?: string;
    title?: string;
    onClick?(node: TreeConfig): any;
  }>;
}
