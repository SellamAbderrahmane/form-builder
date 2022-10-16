import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable()
export class TranslateService implements TranslateLoader {
  constructor(private http: HttpService) {}

  getTranslation(localId: string): Observable<any> {
    return new Observable((sub) => {
      sub.complete();
      // this.http
      //   .fetch({
      //     method: 'GET',
      //     url: `/translate/${localId}`,
      //   })
      //   .then((result) => {
      //     sub.next(result);
      //     sub.complete();
      //   })
      //   .catch((error: any) => {
      //     sub.error(error);
      //     sub.complete();
      //   });
    });
  }
}
