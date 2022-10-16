import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Status } from '../utils';
import { APPCONFIG } from '../config';
import { HttpService } from './http.service';
import { StateConfig, Store } from 'src/app/state';
import { RULE } from '../ability/ability.interface';
import { AbilityService } from '../ability/ability.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  error: boolean = false;

  menus: any[] = [];
  visibilities: any[] = [];

  constructor(
    private ability: AbilityService,
    private http: HttpService,
    private translate: TranslateService,
    private store: Store<StateConfig<APPCONFIG>>
  ) {
    // navigator.permissions
    //   .query({ name: 'notifications' })
    //   .then((permission) => {
    //     permission.onchange = event=> {
    //      console.log(event);
          
    //     }
    //     console.log(permission);
    //   });
  }

  get state(): APPCONFIG {
    return this.store.state;
  }

  async init() {
    console.log('APP_INITIALIZER:: ' + Date.now());
    // await this.loadLoggedInUser();

    return Promise.resolve(this.state);
  }

  async loadLoggedInUser() {
    try {
      const verify: any = await this.http.fetch({
        url: '/user/verify-user',
        method: 'GET',
      });

      if (verify.status === Status.SUCCESS) {
        this.store.setState({
          loading: false,
          accessToken: verify.token,
          lang: verify.user?.lang,
          currentUser: {
            id: verify.user?._id,
            name: verify.user?.name,
            role: verify.user?.role,
            image: verify.user?.image,
            email: verify.user?.email,
            phone: verify.user?.phone,
          },
        });

        const permissions: RULE[] = verify.user?.role?.permissions.map(
          (item: any) => ({
            type: item.category,
            able: item.key,
          })
        );

        this.ability.update(permissions);
        this.subscribeToNotifications(verify.user?._id);
        await this.loadUserMenus();
        await this.getDocumentVisibilities();
        await this.loadInputTypes();
      }
    } catch (err) {
      this.store.setState({
        currentUser: null,
        inputTypes: [],
        loading: false,
      });
    }
  }

  async loadUserMenus() {
    const resp: any = await this.http.fetch({
      url: `/config/user-menus`,
      method: 'GET',
    });

    if (resp.status === Status.SUCCESS) {
      this.menus = resp.menus;
    }
  }

  async loadInputTypes() {
    const resp: any = await this.http.fetch({
      url: '/config/chara_type',
      method: 'GET',
    });

    if (resp.status === Status.SUCCESS) {
      this.store.setState({
        inputTypes: resp.types,
      });
    }
  }

  async getDocumentVisibilities() {
    const resp: any = await this.http.fetch({
      method: 'GET',
      url: '/document/visibilities',
    });

    this.store.setState({
      visibilities: resp.visibilities.map((item: any) => ({
        label: item.label,
        value: item.value,
      })),
    });
  }

  async getCollections() {
    if (this.state.collections.length > 0) {
      return this.state.collections;
    }

    const resp: any = await this.http.fetch({
      method: 'GET',
      url: '/config/colletions',
    });

    const collections = resp.map((collection: any) => ({
      label: collection,
      value: collection,
    }));

    this.store.setState({
      collections: collections,
    });

    return collections;
  }

  async getCollectionKeys(model: string) {
    if (this.state.collectionKeys && this.state.collectionKeys[model]) {
      return this.state.collectionKeys[model];
    }

    const resp: any = await this.http.fetch({
      method: 'GET',
      url: `/config/model-keys/${model}`,
    });

    const keys = resp.map((key: any) => ({
      label: key,
      value: key,
    }));

    this.store.setState({
      collectionKeys: {
        ...this.state.collectionKeys,
        [model]: keys,
      },
    });

    return keys;
  }

  async getCharaList() {
    if (this.state.charaList.length > 0) {
      return this.state.charaList;
    }

    const resp: any = await this.http.fetch({
      method: 'GET',
      url: `/charalist/all`,
    });

    if (resp.status === Status.SUCCESS) {
      const charaList = resp.results.map((item: any) => ({
        value: item._id,
        label: item.LABELIST,
      }));

      this.store.setState({
        charaList: charaList,
      });
      return charaList;
    }
  }

  async removeToken() {
    this.store.setState({
      accessToken: null,
    });
  }

  useLanguage(language: string): void {
    this.translate.use(language);
    this.store.setState({
      lang: language
    });
  }

  subscribeToNotifications(user: any) {
    // if (!this.swPush.isEnabled) {
    //   console.log('Notification is not enabled.');
    //   return;
    // }

    // this.swPush
    //   .requestSubscription({
    //     serverPublicKey: environment.vapidID,
    //   })
    //   .then(async (subscriber) => {
    //     this.store.setState({
    //       subscriber: subscriber,
    //     });

    //     const rep = await this.http.fetch({
    //       method: 'POST',
    //       url: 'notification/subscriber',
    //       data: {
    //         user,
    //         subscriber,
    //       },
    //     });

    //     // console.log(rep);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }
}
