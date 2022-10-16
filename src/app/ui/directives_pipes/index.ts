import { FileIconPipe } from './fileicon.pipe';
import { FilesizePipe } from './filesize.pipe';
import { CreatebyPipe } from './createby.pipe';

export * from './fileicon.pipe';
export * from './filesize.pipe';
export * from './createby.pipe';

export const UI_DIRECTIVES = [];

export const UI_PIPES = [
  FileIconPipe,
  FilesizePipe,
  CreatebyPipe
];