import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from './config.service';
import { FileService } from './file.service';
import { HttpService } from './http.service';
import { MessageService } from './message.service';
import { PermissionService } from './permission.service';

export * from './config.service';
export * from './message.service';
export * from './http.service';
export * from './file.service';
export * from './permission.service';
export * from './translate.service';

export const SHARED_SERVICES = [
  ConfigService,
  FileService,
  MessageService,
  HttpService,
  PermissionService,
  TranslateService,
];
