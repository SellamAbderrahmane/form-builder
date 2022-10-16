import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/shared';
import { HomeService } from './home.service';

@Component({
  selector: 'forms-home',
  template: `<h1>hello</h1>`,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(public service: HomeService, public config: ConfigService) {}

  ngOnInit() {}
}
