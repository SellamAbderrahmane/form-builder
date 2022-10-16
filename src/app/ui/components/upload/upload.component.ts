import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { UploadConfig } from './upload.interface';
import { isFunction, merge } from 'lodash-es';
import { FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'dms-upload',
  template: `
    <nz-upload
      [nzName]="config.name"
      class="upload"
      [nzMultiple]="true"
      [nzType]="config.type"
      [nzListType]="config.listType"
      [(nzFileList)]="config.fileList"
      [nzBeforeUpload]="beforeUpload"
      [nzFileListRender]="fileList"
      nzAction="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      [nzAccept]="config.accept"
      (nzChange)="(onChange)"
    >
      <p class="ant-upload-drag-icon">
        <i class="icon-Upload explorer-icon" style="font-size: 20px"></i>
      </p>
      <p class="ant-upload-text" translate>DRAGFILE</p>
      <p class="ant-upload-hint">
        <small class="support-file"><span translate>SUPPORT</span>: image, pdf</small>
      </p>
    </nz-upload>

    <ng-template #fileList let-files>
      <div class="upload-list">
        <div
          *ngFor="let file of files"
          [ngClass]="{ 'active-file': file.uid === config.selectedFile?.uid }"
          class="upload-list-item"
          (click)="fileClickHandler(file)"
        >
          <span
            class="content"
            *ngIf="file | file: config | async as fileExtra"
          >
            <img [src]="fileExtra.fileImage" width="50px" />
            <div class="file">
              <div class="filename">{{ file.name }}</div>
              <div>{{ fileExtra.fileSize }}</div>
            </div>
          </span>
          <button
            (click)="removeFile(file)"
            nz-button
            nzSize="small"
            nzShape="circle"
            nzType="text"
          >
            <i nz-icon nzType="close"></i>
          </button>
        </div>
      </div>
    </ng-template>
  `,
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  @Input() config: UploadConfig = {
    name: "",
    type: 'drag',
    fileList: [],
    listType: 'text'
  };

  @Input() control: FormControl = new FormControl();

  @Output() onChange: EventEmitter<NzUploadChangeParam> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.config = merge(this.config, {
      fileList: [],
      listType: 'picture',
      type: 'drag',
      uploading: true,
      size: '10240',
      host: environment.baseUrl
    });
  }

  fileClickHandler(file: NzUploadFile) {
    this.config.selectedFile = file;
    if (isFunction(this.config.onFileClick)) this.config.onFileClick(file);
  }

  removeFile = (file: NzUploadFile) => {
    if (file.uid === this.config?.selectedFile?.uid) {
      this.config.selectedFile = null;
    }
    this.config.fileList = this.config.fileList.reduce((acc: any[], f, i) => {
      if (file.uid !== f.uid) {
        acc.push(f);
      }
      return acc;
    }, []);
  };

  beforeUpload = (file: NzUploadFile, fileList: NzUploadFile[]): boolean => {
    this.config.fileList = this.config.fileList.concat(file);
    if (this.control !== null) {
      this.control.setValue(this.config.fileList);
    }
    return false;
  };
}
