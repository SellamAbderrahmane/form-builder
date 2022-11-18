import { Injectable } from "@angular/core"
import { Observable } from "rxjs"

import { APPCONFIG } from "../config"
import { Store } from "src/app/store"
import { HttpService } from "./http.service"

@Injectable({ providedIn: "root" })
export class ConfigService {
  error: boolean = false

  constructor(private http: HttpService, private store: Store<APPCONFIG>) {}

  async init() {
    console.log("APP_INITIALIZER:: " + Date.now())

    // const user = await this.loadLoggedInUser();
    const menus = await this.loadUserMenus()

    this.store.setState({
      loading: false,
      menus,
    })
    return
  }

  // async loadLoggedInUser() {
  //   // try {
  //   //   const verify: any = await this.http.fetch({
  //   //     url: '/user/verify-user',
  //   //     method: 'GET',
  //   //   });
  //   //   if (verify.status === Status.SUCCESS) {
  //   //     this.store.setState({
  //   //       loading: false,
  //   //       accessToken: verify.token,
  //   //       lang: verify.user?.lang,
  //   //       currentUser: {
  //   //         id: verify.user?._id,
  //   //         name: verify.user?.name,
  //   //         role: verify.user?.role,
  //   //         image: verify.user?.image,
  //   //         email: verify.user?.email,
  //   //         phone: verify.user?.phone,
  //   //       },
  //   //     });
  //   //     const permissions: RULE[] = verify.user?.role?.permissions.map(
  //   //       (item: any) => ({
  //   //         type: item.category,
  //   //         able: item.key,
  //   //       })
  //   //     );
  //   //     this.ability.update(permissions);
  //   //     this.subscribeToNotifications(verify.user?._id);
  //   //     await this.loadUserMenus();
  //   //   }
  //   // } catch (err) {
  //   //   this.store.setState({
  //   //     currentUser: null,
  //   //     loading: false,
  //   //   });
  //   // }
  // }

  async loadUserMenus() {
    return [
      {
        _id: "5f96af60b1b45826383f47b3",
        isDefault: true,
        title: "home",
        url: "home",
        icon: "home",
        iconClass: "red",
      },
      {
        _id: "5f96af60b1b45826383f47b4",
        isDefault: true,
        title: "Form buider",
        url: "formbuilder",
        icon: "audit",
        iconClass: "blue",
      },
    ]
    // const resp: any = await this.http.fetch({
    //   url: `/config/user-menus`,
    //   method: 'GET',
    // });
    // if (resp.status === Status.SUCCESS) {
    //   this.menus = resp.menus;
    // }
  }

  // async removeToken() {
  //   this.store.setState({
  //     accessToken: null,
  //   })
  // }

  // useLanguage(language: string): void {
  //   this.translate.use(language)
  //   this.store.setState({
  //     lang: language,
  //   })
  // }

  // subscribeToNotifications(user: any) {
  //   // if (!this.swPush.isEnabled) {
  //   //   console.log('Notification is not enabled.');
  //   //   return;
  //   // }
  //   // this.swPush
  //   //   .requestSubscription({
  //   //     serverPublicKey: environment.vapidID,
  //   //   })
  //   //   .then(async (subscriber) => {
  //   //     this.store.setState({
  //   //       subscriber: subscriber,
  //   //     });
  //   //     const rep = await this.http.fetch({
  //   //       method: 'POST',
  //   //       url: 'notification/subscriber',
  //   //       data: {
  //   //         user,
  //   //         subscriber,
  //   //       },
  //   //     });
  //   //     // console.log(rep);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.log(error);
  //   //   });
  // }
}
