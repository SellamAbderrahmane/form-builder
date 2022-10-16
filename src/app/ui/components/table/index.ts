import { GridCellRenders } from './cellRenders';
import { TableFilterPipe } from './filter.pipe';
import { TableComponent } from './table.component';
import { TableCellRender } from './table.directive';

export * from './table.component';
export * from './table.interface';
export * from './table.directive';
export * from './cellRenders';

export const TABLE_COMPONENTS = [
  TableComponent,
  TableCellRender,
  TableFilterPipe,
  ...GridCellRenders
];
