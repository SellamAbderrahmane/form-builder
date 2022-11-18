import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, OnDestroy } from "@angular/core"
import { isNil, merge, pickBy } from "lodash-es"
import { v4 } from "uuid"

@Component({
  selector: "form-element",
  template: `
    <ng-container [ngSwitch]="element.type">
      <nz-row [ngClass]="{ 'section-row': !previewMode }" *ngSwitchCase="'row'" cdkDrag cdkDragDisabled>
        <nz-col
          cdkDropList
          dragAndDropManager
          [cdkDropListData]="col.children"
          *ngFor="let col of element.children"
          [nzSpan]="24 / element.children.length"
          (cdkDropListDropped)="droped.emit($event)"
        >
          <form-element
            *ngFor="let colEl of col.children; let colIdx = index"
            [parent]="col"
            [element]="colEl"
            [elementIndex]="colIdx"
            [previewMode]="previewMode"
            [config]="colEl.formparam?.formgroup?.value"
            [style]="colEl.formstyle?.formgroup?.value"
            (ondelete)="deleteChild($event)"
            (onselect)="onselect.emit($event)"
          ></form-element>
        </nz-col>
        <div class="row-controls" *ngIf="!previewMode">
          <button nz-button nzSize="small" nzDanger nzShape="circle" (click)="deleteElement()">
            <i nz-icon nzType="delete"></i>
          </button>
        </div>
      </nz-row>

      <nz-form-item
        cdkDrag
        *ngSwitchDefault
        id="elementContainer"
        [cdkDragData]="element"
        (click)="containerClick()"
        [ngClass]="{ 'active-container': showControls && !previewMode }"
      >
        <nz-form-label *ngIf="elementconfig.label && elementconfig.type !== 'checkbox'" [nzRequired]="elementconfig.required" [nzFor]="element.key">
          <span>{{ elementconfig.label }}</span>
        </nz-form-label>
        <nz-form-control readonly [nzExtra]="elementconfig.description">
          <ng-template form-element ngDefaultControl [config]="elementconfig" [style]="style" [previewMode]="previewMode"></ng-template>
        </nz-form-control>

        <div class="element-controls" *ngIf="showControls">
          <button nz-button nzSize="small" nzDanger nzShape="circle" (click)="deleteElement()">
            <i nz-icon nzType="delete"></i>
          </button>
          <button nz-button nzSize="small" cdkDragHandle nzShape="circle">
            <i nz-icon nzType="drag"></i>
          </button>
        </div>
        <span *cdkDragPreview>{{ element.name }}</span>
        <div class="drag-placeholder" *cdkDragPlaceholder></div>
      </nz-form-item>
    </ng-container>
  `,
  styles: [
    `
      :host:has(nz-row) {
        /* min-height: 20px;
        border: 0.5px solid #2196f3; */
      }

      #elementContainer {
        position: relative;
        padding: 0.2em;
        border-radius: 5px;
      }

      .active-container {
        border: 1px solid #2196f3;
      }

      .element-controls {
        position: absolute;
        top: 0;
        transform: translate(0, -50%);
        right: 0.5em;
        display: flex;
        gap: 4px;
        background: white;
        padding: 0 0.5em;
      }

      .section-row {
        position: relative;
        flex: auto;
      }

      .section-row nz-col {
        padding: 1em;
      }

      .section-row > nz-col + nz-col {
        border-left: 0.5px solid #2196f3;
      }

      .section-row .row-controls {
        position: absolute;
        top: 0;
        transform: translate(0, -50%);
        left: 0.5em;
        display: flex;
        gap: 4px;
        background: white;
        padding: 0 0.5em;
      }
    `,
  ],
})
export class FormElementComponent implements OnInit, OnDestroy {
  @Input() style: any
  @Input() parent: any
  @Input() element: any
  @Input() elementIndex: number
  @Input() previewMode: boolean

  @Input() set config(v: any) {
    const value = pickBy(v, (v) => !isNil(v))
    this.elementconfig = merge({ type: this.element.type, readOnly: this.previewMode }, value)
  }

  @Output() droped: EventEmitter<any> = new EventEmitter()
  @Output() ondelete: EventEmitter<any> = new EventEmitter()
  @Output() onselect: EventEmitter<any> = new EventEmitter()

  elementconfig: any
  showControls: boolean

  constructor(private elementRef: ElementRef) {}

  ngOnDestroy(): void {}

  ngOnInit() {}

  containerClick() {
    if (this.previewMode) {
      this.showControls = false
      this.onselect.emit(null)
      return
    }

    this.showControls = true
    this.onselect.emit(this.element)
  }

  deleteElement() {
    this.ondelete.emit({ parent: this.parent, element: this.element, elementIndex: this.elementIndex })
  }

  deleteChild({ element, parent, elementIndex }) {
    this.ondelete.emit({ parent, element, elementIndex })
  }

  @HostListener("document:click", ["$event"])
  clickout(event: any) {
    const formContainer = this.elementRef.nativeElement.closest("#formContainer")
    if (!event.target.closest("#elementContainer") && formContainer.contains(event.target)) {
      this.onselect.emit(null)
    }

    if (!this.elementRef.nativeElement.contains(event.target) && formContainer.contains(event.target)) {
      this.showControls = false
    }
  }
}
