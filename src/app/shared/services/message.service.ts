import { Injectable, TemplateRef } from '@angular/core';
import {
  NzMessageDataOptions,
  NzMessageRef,
  NzMessageService,
} from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Injectable({ providedIn: 'root' })
export class MessageService {
  constructor(
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  openConfirmModal(title: any, message: any, onOk?: Function) {
    this.modal.confirm({
      nzTitle: title,
      nzOkDanger:true,
      nzOkText: 'Oui',
      nzCancelText: 'Annuler',
      nzOnOk: () => onOk(),
      nzOnCancel: () => console.log('Cancel'),
      nzContent: message,
    });
  }

  openDeleteConfirmModal(title: any, message: any, onOk?: Function) {
    this.modal.confirm({
      nzTitle: title,
      nzOkDanger:true,
      nzOkText: 'Supprimer',
      nzCancelText: 'Annuler',
      nzOnOk: () => onOk(),
      nzOnCancel: () => console.log('Cancel'),
      nzContent: message,
    });
  }

  success(
    content: string | TemplateRef<void>,
    options?: NzMessageDataOptions
  ): NzMessageRef {
    return this.message.success(content, options);
  }
  error(
    content: string | TemplateRef<void>,
    options?: NzMessageDataOptions
  ): NzMessageRef {
    return this.message.error(content, options);
  }
  info(
    content: string | TemplateRef<void>,
    options?: NzMessageDataOptions
  ): NzMessageRef {
    return this.message.info(content, options);
  }
  warning(
    content: string | TemplateRef<void>,
    options?: NzMessageDataOptions
  ): NzMessageRef {
    return this.message.warning(content, options);
  }
  loading(
    content: string | TemplateRef<void>,
    options?: NzMessageDataOptions
  ): NzMessageRef {
    return this.message.loading(content, options);
  }
}
