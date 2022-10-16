import { Component, Input } from '@angular/core';
import { Tag, TagsConfig } from './tags.interface';
import { each, isFunction } from 'lodash-es';

@Component({
  selector: 'dms-tags',
  template: `
    <nz-row [nzGutter]="[12, 12]">
      <nz-col [nzSpan]="24">
        <nz-tag
          *ngFor="let tag of config?.list"
          [nzMode]="tag.mode || 'closeable'"
          (nzOnClose)="handleClose(tag)"
        >
          {{ tag.value }}
        </nz-tag>
      </nz-col>
      <nz-col [nzSpan]="24">
        <input
          nz-input
          type="text"
          [placeholder]="'TAG_DOC.NAME_TAG' | translate"
          [(ngModel)]="inputValue"
          (keydown.enter)="handleInputConfirm()"
        />
      </nz-col>
    </nz-row>
  `,
  styles: [
    `
      nz-tag {
        margin: 3px !important;
        padding: 5px 10px !important;
        font-weight: 700 !important;
        border: 1px solid #99bad7 !important;
        background: #f3f9fe !important;
      }
    `,
  ],
})
export class TagsComponent {
  @Input() config: TagsConfig = {
    key: 'default',
    list: [],
  };
  inputValue = '';

  handleClose(removedTag: Tag): void {
    this.config.list = this.config.list.filter(
      (tag) => tag.value !== removedTag.value
    );
    if (isFunction(this.config.onDelete)) {
      this.config.onDelete(removedTag);
    }
  }

  handleInputConfirm(): void {
    let exist = false;
    each(this.config.list, (el) => {
      if (el.value === this.inputValue) exist = true;
    });
    if (this.inputValue && !exist) {
      const tag: Tag = {
        mode: 'closeable',
        value: this.inputValue,
      };
      this.config.list = [...this.config.list, tag];
      if (isFunction(this.config.onAdd)) {
        this.config.onAdd(tag);
      }
    }
    this.inputValue = null;
  }
}
