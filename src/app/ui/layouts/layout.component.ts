import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
// import { AuthService } from 'src/app/auth/services/auth.service';
import { ConfigService } from 'src/app/shared';

@Component({
  selector: 'app-layout',
  templateUrl: 'layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  isCollapsed = true;

  constructor(
    public config: ConfigService,
    // public authService: AuthService,
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit() {}

  logout() {
    // this.authService.logout().then((r) => {
    //   this.router.navigateByUrl('/auth');
    // });
  }

  fullScreen() {
    let elem = document.documentElement as HTMLElement & {
      mozRequestFullScreen(): Promise<void>;
      webkitRequestFullScreen(): Promise<void>;
      msRequestFullScreen(): Promise<void>;
    };

    let methodToBeInvoked =
      elem.requestFullscreen ||
      elem.webkitRequestFullScreen ||
      elem['mozRequestFullscreen'] ||
      elem['msRequestFullscreen'];
    if (methodToBeInvoked) methodToBeInvoked.call(elem);
  }

  nzRouteLabelFn(label: string) {
    if (!label) return label;

    return this.translate.instant(label);
  }

  linkClick() {
    if (window.innerWidth <= 898) {
      this.isCollapsed = !this.isCollapsed;
    }
  }
}
