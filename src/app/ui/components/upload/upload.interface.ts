import { NzUploadFile, NzUploadListType, NzUploadType } from 'ng-zorro-antd/upload';

export interface UploadConfig {
  host?: string;
  uploading?: boolean;
  accept?: string;
  limit?: number;
  size?: number;
  fileType?: string;
  name?: string;
  type?: NzUploadType;
  fileList?: NzUploadFile[];
  selectedFile?: any;
  onFileClick?(file: NzUploadFile): any;
  listType?: NzUploadListType;
}

export const fileicons = {
  pdf: 'public/images/pdf.svg',
  docx: 'public/images/doc.svg',
  exec: 'public/images/xls.svg',
  jar: 'public/images/zip.svg',
  rar: 'public/images/zip.svg',
  zip: 'public/images/zip.svg',
  png: 'public/images/png.svg',
  jpg: 'public/images/jpg.svg',
  gif: 'public/images/file.svg',
  svg: 'public/images/svg.svg',
  ts: 'public/images/file.svg',
  json: 'public/images/json.svg',
  js: 'public/images/javascript.svg',
  html: 'public/images/html.svg',
  txt: 'public/images/text.svg',
  jfif: "public/images/gift.svg",
  ppt: "public/images/ppt.svg",
  pptx: "public/images/ppt.svg"
};
