import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dms-error',
  template: `
    <div class="error">
      <img src="assets/error.jpg" />
    </div>
  `,
  styles: [
    `
      .error {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .error img {
        width: 40%;
      }
    `,
  ],
})
export class ErrorPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
