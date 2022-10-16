import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { isString } from 'lodash-es';
import { TOKEN, AxiosClient, AxiosClientParams } from '../utils';
import { defaultConfig } from '../config';
import { MessageService } from './message.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  errorHandler: BehaviorSubject<any> = new BehaviorSubject(null);

  api: AxiosClient = new AxiosClient(defaultConfig.axios);

  modal: {
    info: Function;
    success: Function;
    error: Function;
    warning: Function;
  } = {
    info: (title: string, message: string) => {
      this.messageService.info(`<strong>${message}</strong>`);
    },
    success: (title: string, message: string) => {
      this.messageService.success(`<strong>${message}</strong>`);
    },
    error: (title: string, message: string) => {
      this.modalService.error({
        nzTitle: title,
        nzContent: `<strong>${message}</strong>`,
        nzOkDanger: true,
        nzCancelText: 'Annuler',
      });
    },
    warning: (title: string, message: string) => {
      this.messageService.warning(`<strong>${message}</strong>`, {
        nzPauseOnHover: true,
      });
    },
  };
  constructor(
    private notification: NzNotificationService,
    private modalService: NzModalService,
    private messageService: MessageService
  ) {
    this.api.urlPrefix = '';

    this.api.axiosInstance.interceptors.request.use(
      (req) => {
        req.headers['Authorization'] = 'Bearer ' + this.accessToken;
        return req;
      },
      (err) => Promise.reject(err)
    );

    this.api.axiosInstance.interceptors.response.use(
      (rep) => rep,
      async (error) => {
        this.errorHandler.next(error);
        return Promise.reject(error);
      }
    );

    this.api.onError = (status: number, error: any) => {
      if (status >= 500) {
        this.createNotification('error', 'ORASS-ERROR', error);
      } else {
        if (isString(error)) {
          this.createNotification('warning', 'ORASS-ERROR', error);
        } else if (error) {
          this.createNotification(
            error.typemess,
            error.titrmess,
            error.libemess
          );
        } else {
          this.createNotification(
            'error',
            'ORASS-ERROR',
            '[0000] - An unexpected error occurred !!'
          );
        }
      }
    };
  }

  fetch(p: AxiosClientParams) {
    return this.api.fetch(p);
  }

  createNotification(
    type: 'success' | 'info' | 'warning' | 'error',
    title: string,
    message: string
  ): void {
    if (this.modal[type]) {
      this.modal[type](title, message);
    } else {
      this.notification.create(type, title, message);
    }
  }

  get accessToken() {
    return localStorage.getItem(TOKEN);
  }
}
