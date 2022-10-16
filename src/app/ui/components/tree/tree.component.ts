import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
  TemplateRef,
} from '@angular/core';
import {
  NzFormatEmitEvent,
  NzTreeNode,
  NzTreeNodeOptions,
} from 'ng-zorro-antd/tree';
import { TreeConfig } from './tree.interface';
import { isFunction, merge } from 'lodash-es';

@Component({
  selector: 'dms-tree',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nz-row [nzGutter]="[0, 12]">
      <nz-col [nzSpan]="24" *ngIf="!contentEmpty">
        <div #content>
          <ng-content></ng-content>
        </div>
      </nz-col>
      <nz-col [nzSpan]="24" *ngIf="config.showSearch">
        <nz-input-group [nzPrefix]="prefixIcon">
          <input
            type="text"
            nz-input
            placeholder="Search"
            [(ngModel)]="config.searchValue"
          />
        </nz-input-group>
        <ng-template #prefixIcon>
          <i nz-icon nzType="search"></i>
        </ng-template>
      </nz-col>
      <nz-col [nzSpan]="24">
        <nz-tree
          [nzData]="nodes || []"
          (nzClick)="activeNode($event)"
          (nzDblClick)="openFolder($event)"
          (nzExpandChange)="
            config.expandChange != null
              ? config.expandChange($event.node)
              : null
          "
          (nzOnDragStart)="(config.onDragStart)"
          (nzOnDragEnter)="(config.onDragEnter)"
          (nzOnDragLeave)="(config.onDragLeave)"
          (nzOnDragOver)="(config.onDragOver)"
          (nzOnDragEnd)="(config.onDragEnd)"
          (nzOnDrop)="(config.onDrop)"
          (nzSearchValueChange)="(config.searchValueChange)"
          [nzTreeTemplate]="nzTreeTemplate"
          [nzExpandedIcon]="expandedIcon || exp"
          [nzAsyncData]="config.asyncData"
          [nzShowExpand]="config.showExpand"
          [nzBlockNode]="config.blockNode"
          [nzCheckable]="config.checkable"
          [nzCheckStrictly]="config.checkStrictly"
          [nzDraggable]="config.draggable"
          [nzExpandAll]="config.expandAll"
          [nzShowLine]="config.showLine"
          [nzHideUnMatched]="config.hideUnMatched"
          [nzExpandedKeys]="config.expandKeys"
          [nzVirtualHeight]="config.height"
          [nzVirtualItemSize]="config.itemSize"
          [nzMultiple]="config.multiple"
          [nzSearchValue]="config.searchValue"
          [nzSearchFunc]="config.searchFun"
          [nzSelectedKeys]="config.selectedKeys"
          [nzCheckedKeys]="config.checkedKeys"
        >
          <ng-template #exp let-node let-origin="origin">
            <div
              [ngClass]="{
                'node-active': node.isActived
              }"
            >
              <i
                *ngIf="!origin.isLeaf && origin.children"
                class="align-vm"
                [class]="!node.isExpanded ? 'icon-Angle-right' : 'icon-Angle-down'"
              ></i>
            </div>
          </ng-template>
        </nz-tree>
      </nz-col>
    </nz-row>

    <ng-template #nzTreeTemplate let-node let-origin="origin">
      <span class="custom-node">
        <span>
          <i nz-icon [nzType]="node.icon"></i>
          <span class="folder-name">{{ node.title | lowercase }}</span>
        </span>
        <div *ngIf="config.actions && config.actions.length > 0">
          <button
            nz-button
            nzSize="small"
            nzType="text"
            nz-dropdown
            [nzDropdownMenu]="menu"
            nzTrigger="click"
          >
            <i nz-icon nzType="more" class="danger"></i>
          </button>
          <nz-dropdown-menu #menu="nzDropdownMenu">
            <ul nz-menu>
              <ng-container *ngFor="let action of config.actions">
                <li
                  nz-menu-item
                  [ngClass]="action.class"
                  (click)="actionClick(action, origin)"
                >
                  <i nz-icon [nzType]="action.icon" *ngIf="action.icon"
                    style="margin-right: .3em;"></i>
                  <span translate>{{ action.title }}</span>
                </li>
              </ng-container>
            </ul>
          </nz-dropdown-menu>
        </div>
      </span>
    </ng-template>
  `,
  styles: [
    `
      nz-tree {
        display: grid;
      }

      nz-tree .ant-tree-treenode {
        align-items: center;
      }

      .custom-node {
        cursor: pointer;
        line-height: 24px;
        padding: 0 4px;
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 100px;
      }

      .file-name,
      .folder-name {
        margin-left: 4px;
      }
    `,
  ],
})
export class TreeComponent implements OnInit, AfterViewInit {
  @Input() config: TreeConfig;
  @Input() nodes: NzTreeNodeOptions[] | NzTreeNode[] = [];
  @Input() expandedIcon: TemplateRef<{ $implicit: NzTreeNode }>;
  @ViewChild('content') content: ElementRef;
  activatedNode?: any;
  contentEmpty?: boolean = true;

  constructor() {}

  ngAfterViewInit() {
    this.contentEmpty = this.content
      ? this.content?.nativeElement?.childNodes?.length === 0
      : true;
  }

  ngOnInit() {
    this.config = merge(this.config, {
      blockNode: true,
      hideUnMatched: true,
      // showSearch: false,
      // showLine: false,
      checkedKeys: [],
      selectedKeys: [],
      showExpand: true,
    });
  }

  openFolder(data: NzTreeNode | NzFormatEmitEvent): void {
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
      if (isFunction(this.config.dbClick)) {
        this.config.dbClick(data);
      }
    } else {
      const node = data.node;
      if (node) {
        node.isExpanded = !node.isExpanded;
      }
      if (isFunction(this.config.dbClick)) {
        this.config.dbClick(node);
      }
    }
  }

  activeNode(data: NzFormatEmitEvent): void {
    this.activatedNode = data.node!;
    if (isFunction(this.config.click)) {
      this.config.click(data.node.origin);
    }
  }

  actionClick(action, v) {
    if (isFunction(action.onClick)) {
      action.onClick(v);
    }
  }
}
