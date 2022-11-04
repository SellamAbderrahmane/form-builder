import { FileIconPipe } from './fileicon.pipe';
import { FilesizePipe } from './filesize.pipe';
import { CreatebyPipe } from './createby.pipe';
import { ResizableDirective } from './resizable.directive';

export * from './fileicon.pipe';
export * from './filesize.pipe';
export * from './createby.pipe';
export * from './resizable.directive';

export const UI_DIRECTIVES = [
  ResizableDirective
];

export const UI_PIPES = [
  FileIconPipe,
  FilesizePipe,
  CreatebyPipe
];