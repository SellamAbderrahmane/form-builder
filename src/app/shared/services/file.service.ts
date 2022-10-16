import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable({ providedIn: 'root' })
export class FileService {
  constructor() {}

  b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  async download(base64: any, contentType = '', filename: string = 'file') {
    try {
      const blob = this.b64toBlob(base64, contentType);
      saveAs(blob, filename);
    } catch (error) {
      console.log(error);
    }
  }

  async getBase64ImageFromUrl(imageUrl) {
    var res = await fetch(imageUrl);
    var blob = await res.blob();

    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.onloadend = (e) => {
        resolve(reader.result);
      };
      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    });
  }

  async getBase64ImageFromFile(file: any) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onloadend = (value) => {
        resolve(fileReader.result);
      };
      fileReader.onerror = () => {
        reject(this);
      };
      fileReader.readAsDataURL(file);
    });
  }
}
