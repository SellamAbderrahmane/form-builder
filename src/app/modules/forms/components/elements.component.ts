import { CdkDragExit } from "@angular/cdk/drag-drop"
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core"

@Component({
  selector: "forms-elements",
  template: `
    <nz-tabset nzSize="large" nzTabPosition="right" [tabIndex]="tabIndex" (nzSelectedIndexChange)="tabIndex = $event">
      <nz-tab
        id="source"
        cdkDropList
        cdkDropListSortingDisabled
        dragAndDropManager
        [nzTitle]="titleTemplate"
        [cdkDropListData]="element.children"
        (cdkDropListExited)="exited($event)"
        *ngFor="let element of formElements"
      >
        <ng-template #titleTemplate>
          <i nz-icon [nzType]="element.icon"></i>
        </ng-template>

        <ul nz-menu nzMode="inline" [nzSelectable]="false">
          <li cdkDrag nz-menu-item class="field-item" [cdkDragData]="item" [cdkDragDisabled]="previewMode" *ngFor="let item of element.children">
            <div cdkDragHandle>
              <span nz-icon nzType="holder"></span>
            </div>
            <div>
              <span class="field-icon">
                <i nz-icon [nzType]="item.menuConfig.icon"></i>
              </span>
              <span translate>{{ item.menuConfig.name }}</span>
            </div>
            <span *cdkDragPreview>{{ item.menuConfig.name }}</span>
            <div class="drag-placeholder" *cdkDragPlaceholder></div>
          </li>
        </ul>
      </nz-tab>
    </nz-tabset>
  `,
})
export class FormElementsComponent implements OnInit {
  @Input() previewMode: boolean
  @Input() formElements: any[] = []

  tabIndex: number = 0

  constructor() {}

  ngOnInit() {}

  exited(event: CdkDragExit<any>) {
    const { container, item } = event
    const index = container.data.findIndex((el: any) => el.id === item.data.id)

    this.formElements[this.tabIndex].children.splice(index + 1, 0, {
      ...item.data,
      temp: true,
    })
  }
}
