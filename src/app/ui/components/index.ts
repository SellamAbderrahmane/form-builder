import { FORM_COMPONENTS } from './forms';
import { TABLE_COMPONENTS } from './table';
import { TagsComponent } from './tags';
import { TransferComponent } from './transfer';
import { TreeComponent } from './tree';
import { UploadComponent } from './upload';

export * from './forms';
export * from './upload';
export * from './transfer';
export * from './tree';
export * from './tags';
export * from './table';

export const UI_COMPONENTS: any[] = [
  TreeComponent,
  UploadComponent,
  TransferComponent,
  TagsComponent,
  ...FORM_COMPONENTS,
  ...TABLE_COMPONENTS,
];
