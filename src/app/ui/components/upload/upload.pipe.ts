import { Pipe, PipeTransform } from '@angular/core';
import { fileicons, UploadConfig } from './upload.interface';

@Pipe({
  name: 'file',
  // pure: true,
})
export class FileInfoPipe implements PipeTransform {
  constructor() {}
  async transform(
    value: any,
    config: UploadConfig
  ): Promise<{
    fileImage: string;
    fileSize: string;
  }> {
    const fileImage = await this.fileImage(value, config);
    const fileSize = await this.fileSize(value.size);

    return {
      fileImage,
      fileSize,
    };
  }

  fileSize(bytes: any) {
    if ((bytes >> 30) & 0x3ff)
      bytes = (bytes >>> 30) + '.' + (bytes & (3 * 0x3ff)) + 'GB';
    else if ((bytes >> 20) & 0x3ff)
      bytes = (bytes >>> 20) + '.' + (bytes & (2 * 0x3ff)) + 'MB';
    else if ((bytes >> 10) & 0x3ff)
      bytes = (bytes >>> 10) + '.' + (bytes & 0x3ff) + 'KB';
    else if ((bytes >> 1) & 0x3ff) bytes = (bytes >>> 1) + 'Bytes';
    else bytes = bytes + 'Byte';
    return bytes;
  }

  fileImage(file: any, config: UploadConfig): string {
    const ext = file.name.split('.').pop();
    return config.host + (fileicons[ext] || 'public/images/file.svg');
    // return new Promise((resolve, reject) => {
    //   const fileReader: FileReader = new FileReader();
    //   fileReader.onloadend = (e) => {
    //     const arr = file.name.split('.');
    //     return resolve(fileicons[arr[arr.length - 1]]);
    //   };
    //   fileReader.readAsDataURL(file);
    // });
  }
}
