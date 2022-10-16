import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/shared';

@Component({
  selector: 'app-form',
  styleUrls: ['./form.component.scss'],
  template: `
    <nz-layout class="module-layout">
      <nz-content> log </nz-content>
      <nz-sider nzWidth="300px" [nzTheme]="config.state.theme"> </nz-sider>
      <nz-sider
        nzWidth="55px"
        [nzCollapsed]="true"
        [nzCollapsedWidth]="55"
        [nzTheme]="config.state.theme"
      >
        <ul nz-menu nzMode="inline" nzMatchRouter [nzInlineCollapsed]="true">
          <li nz-menu-item nzMatchRouter>
            <a class="menu-item">
              <i nz-icon [nzType]="'setting'"></i>
              <span translate>{{ 'title' }}</span>
            </a>
            <!-- <a [routerLink]="[menu.url]" class="menu-item">
              <i nz-icon [nzType]="menu.icon" [class]="menu.iconClass"></i>
              <span translate>{{ menu.title }}</span>
            </a> -->
          </li>
          <li nz-menu-item nzMatchRouter>
            <a class="menu-item">
              <i nz-icon [nzType]="'setting'"></i>
              <span translate>{{ 'title' }}</span>
            </a>
            <!-- <a [routerLink]="[menu.url]" class="menu-item">
              <i nz-icon [nzType]="menu.icon" [class]="menu.iconClass"></i>
              <span translate>{{ menu.title }}</span>
            </a> -->
          </li>
          <li nz-menu-item nzMatchRouter>
            <a class="menu-item">
              <i nz-icon [nzType]="'setting'"></i>
              <span translate>{{ 'title' }}</span>
            </a>
            <!-- <a [routerLink]="[menu.url]" class="menu-item">
              <i nz-icon [nzType]="menu.icon" [class]="menu.iconClass"></i>
              <span translate>{{ menu.title }}</span>
            </a> -->
          </li>
        </ul>
      </nz-sider>
    </nz-layout>
  `,
})
export class FormComponent implements OnInit {
  constructor(public config: ConfigService) {}

  ngOnInit() {}
}
