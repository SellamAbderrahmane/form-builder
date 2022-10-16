import { Injectable } from '@angular/core';
import { StateService } from 'src/app/state';
import { ConfigService } from './config.service';

@Injectable({ providedIn: 'root' })
export class PermissionService {
  constructor(private state: StateService) {}

  get canRead(): boolean {

    // const user = this.config.state.currentUser;
    // if (user)
    //   return (
    //     user.permissions.findIndex((per) => per.name === EPermission.READ) !==
    //     -1
    //   );
    return false;
  }

  get canWrite(): boolean {
    // const user = this.config.state.currentUser;
    // if (user)
    //   return (
    //     user.permissions.findIndex((per) => per.name === EPermission.CREATE) !==
    //     -1
    //   );
    return false;
  }

  get canUpdate(): boolean {
    // const user = this.config.state.currentUser;
    // if (user)
    //   return (
    //     user.permissions.findIndex((per) => per.name === EPermission.UPDATE) !==
    //     -1
    //   );
    return false;
  }

  get canDelete(): boolean {
    // const user = this.config.state.currentUser;
    // if (user)
    //   return (
    //     user.permissions.findIndex((per) => per.name === EPermission.DELETE) !==
    //     -1
    //   );
    return false;
  }

  get canDownload(): boolean {
    // const user = this.config.state.currentUser;
    // if (user)
    //   return (
    //     user.permissions.findIndex(
    //       (per) => per.name === EPermission.DOWNLOAD
    //     ) !== -1
    //   );
    return false;
  }
}
