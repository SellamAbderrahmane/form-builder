import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

export enum Status {
  SUCCESS = 'Success',
  ERROR = 'Error',
}

export class AxiosClient {
  axiosInstance: AxiosInstance;
  endpoints: any;
  globale_data: any;
  urlPrefix: string;
  onError: Function;

  constructor(defaultConfig: AxiosClientParams) {
    this.axiosInstance = axios.create(defaultConfig);
    this.endpoints = {};
    this.globale_data = {};
  }

  fetchApi(name: string) {
    return this.fetch({ endpoint: name });
  }

  fetch(p: AxiosClientParams) {
    if (p.data instanceof FormData) {
      return this.postFormData(p.url, p.data);
    }

    return new Promise(async (resolve, reject) => {
      p.method = p.method || 'post';
      p.data = p.data || {};

      if (!p.suppPrefix) {
        p.url = this.urlPrefix + p.url;
      }

      p.data = {
        ...p.data,
        ...this.globale_data,
      };

      await this.axiosInstance
        .request(p)
        .then((rep) => {
          if (rep.status >= 500) {
            this.onError('HTTP ERROR CODE: ' + rep.status);
            reject('HTTP ERROR CODE: ' + rep.status);
          } else {
            if (rep.data.status === Status.ERROR) {
              this.onError(rep.data.msg);
              reject(rep.data.msg);
            } else {
              resolve(rep.data.data || rep.data || {});
            }
          }
        })
        .catch((err: AxiosError<any, any>) => {
          const status = err.response?.status;
          if (err.response?.data?.msg) {
            this.onError(status, err.response.data.msg);
            return reject(err.response.data.msg);
          }

          if (typeof err.response?.data === 'string') {
            this.onError(status, err.response.data);
            return reject(err.response.data);
          }

          this.onError(status, err.message);
          return reject(err.message);
        });
    });
  }

  private postFormData(url: string, data: FormData) {
    return new Promise(async (resolve, reject) => {
      await this.axiosInstance
        .post(url, data)
        .then((rep) => {
          if (rep.status >= 500) {
            this.onError('HTTP ERROR CODE: ' + rep.status);
            reject('HTTP ERROR CODE: ' + rep.status);
          } else {
            if (rep.data.status === Status.ERROR) {
              this.onError(rep.data.msg);
              reject(rep.data.msg);
            } else {
              resolve(rep.data.data || rep.data || {});
            }
          }
        })
        .catch((err: AxiosError<any, any>) => {
          const status = err.response?.status;
          if (err.response?.data?.msg) {
            this.onError(status, err.response.data.msg);
            return reject(err.response.data.msg);
          }
          if (typeof err.response?.data === 'string') {
            this.onError(status, err.response.data);
            return reject(err.response.data);
          }

          this.onError(status, err.message);
          return reject(err.message);
        });
    });
  }

  registerEP(name: string, config: AxiosClientParams) {
    this.endpoints[name] = config;
  }
}

export interface AxiosClientParams extends AxiosRequestConfig {
  endpoint?: string;
  skeleton?: string;
  suppPrefix?: boolean;
  onError?: Function;
}
