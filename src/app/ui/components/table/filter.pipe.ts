import { Pipe, PipeTransform } from '@angular/core';
import { TableHeadConfig, TableDataSet } from './table.interface';

@Pipe({
  name: 'tableFilter',
})
export class TableFilterPipe implements PipeTransform {
  transform(
    list: readonly TableDataSet[],
    columnDefs: TableHeadConfig[],
    value: string
  ) {
    if (!list) {
      return [];
    }

    if (!value) {
      return list;
    }

    return this.filter(list, columnDefs, value);
  }

  filter(items: readonly TableDataSet[], columnDefs: any[], value: any) {
    return items.filter((item) => {
      return columnDefs.some((head) => {
        if (typeof item[head.field] == 'number') {
          return item[head.field] == value;
        }

        if (Array.isArray(item[head.field])) {
          return item[head.field].some((el: any) =>
            Object.values(el).includes(value)
          );
        }

        if (!item[head.field]) {
          return false;
        }

        return item[head.field]?.toLowerCase().includes(value?.toLowerCase());
      });
    });
  }
}
