import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { debounce, merge } from 'lodash-es';
import { TableDataSet, TableHeadConfig, TableSetting } from './table.interface';

@Component({
  selector: 'dms-table',
  templateUrl: 'table.component.html',
  styleUrls: ['table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input('loading') loading: boolean;
  @Input('settings') settings: TableSetting;
  @Input('dataset') dataset: TableDataSet[];
  @Input('columnDefs') columnDefs: TableHeadConfig[];

  @Output('onReady') onReady: EventEmitter<any> = new EventEmitter();

  scroll: any = {};
  allChecked = false;
  indeterminate = false;

  searchString: string;
  expandData = new Set<number>();
  expandSet = new Set<TableHeadConfig>();

  constructor() {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.hideColumns(event.target.innerWidth);
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.onReady.emit(), 0);
  }

  ngOnInit() {
    const defaultSettings = {
      breakWord: false,
      bordered: false,
      pagination: true,
      sizeChanger: false,
      expandable: false,
      checkbox: false,
      fixHeader: false,
      noResult: false,
      ellipsis: false,
      simple: false,
      size: 'small',
      paginationType: 'default',
      tableScroll: 'scroll',
      tableLayout: 'fixed',
      position: 'bottom',
      queryParams: (params) => {},
      pageSizeChange: (index) => {},
      pageIndexChange: (index) => {},
      currentPageDataChange: (data) => {},
    };

    this.settings = merge(defaultSettings, this.settings);

    if (this.settings.tableScroll !== 'unset') {
      this.scroll = { x: 'auto' };
    }

    this.hideColumns(window.innerWidth);
  }

  hideColumns(innerWidth: number) {
    if (innerWidth <= 768) {
      this.columnDefs?.slice(1).forEach((el) => {
        if(el.actions && el.actions.length > 0) {
          return;
        }

        this.expandSet.add(el);
      });

      return;
    }

    this.dataset.forEach(d => {
      d.expand = false;
    });

    this.expandSet.clear();
    this.expandData.clear();
  }

  onExpandChange(index: number, checked: boolean): void {
    if (checked) {
      this.expandData.add(index);
    } else {
      this.expandData.delete(index);
    }
  }

  checkAll(value: any) {
    this.dataset.forEach((data) => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }

  refreshStatus() {
    const validData = this.dataset.filter((value) => !value.disabled);
    const allChecked =
      validData.length > 0 &&
      validData.every((value) => value.checked === true);
    const allUnChecked = validData.every((value) => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = !allChecked && !allUnChecked;

    
  }

  queryParams(params: any) {
    this.settings.queryParams(params);
  }

  pageSizeChange(index: number) {
    this.settings.pageSizeChange(index);
  }

  pageIndexChange(index: number) {
    this.settings.pageIndexChange(index);
  }

  currentPageDataChange(data: readonly TableDataSet[]) {
    this.settings.currentPageDataChange(data);
  }
}
