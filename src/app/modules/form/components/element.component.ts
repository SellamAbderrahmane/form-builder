import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, OnDestroy } from "@angular/core"
import { isNil, merge, pickBy } from "lodash-es"
import { BehaviorSubject, Subscription } from "rxjs"
import { FormService } from "../services/form.service"

@Component({
  selector: "form-element",
  template: `
    <ng-container [ngSwitch]="element.type">
      <nz-row class="section-row" *ngSwitchCase="'row'" cdkDrag cdkDragDisabled>
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
            [element]="colEl"
            [param]="colEl.formdata?.formgroup?.value"
            (ondelete)="col.children.splice(colIdx, 1)"
          ></form-element>
        </nz-col>
        <div class="row-controls">
          <button nz-button nzSize="small" nzDanger nzShape="circle" (click)="ondelete.emit(element)">
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
        [ngClass]="{ 'active-container': showControls.value }"
      >
        <nz-form-label *ngIf="elementconfig.label && elementconfig.type !== 'checkbox'" [nzRequired]="elementconfig.required" [nzFor]="element.key">
          <span>{{ elementconfig.label }}</span>
        </nz-form-label>
        <nz-form-control readonly [nzExtra]="elementconfig.description">
          <ng-template form-element ngDefaultControl [config]="elementconfig" [style]="elementstyle"></ng-template>
        </nz-form-control>

        <div class="element-controls" *ngIf="showControls.value">
          <button nz-button nzSize="small" nzDanger nzShape="circle" (click)="ondelete.emit(element)">
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

      .row-controls {
        position: absolute;
        top: 0;
        transform: translate(0, -50%);
        left: 0.5em;
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
    `,
  ],
})
export class FormElementComponent implements OnInit, OnDestroy {
  @Input() element: any
  @Input() set param(v: any) {
    const value = Object.entries(v).reduce(
      (acc, [key, value]: any) => {
        if (isNil(v)) return acc

        const field = this.element.formdata.fields.find((el: any) => el.key === key)

        if (field.isStyle) acc.style[key] = value
        else acc.config[key] = value

        return acc
      },
      {
        style: {},
        config: { type: this.element.type, readOnly: true },
      }
    )

    this.elementconfig = value.config
    this.elementstyle = value.style
    // this.elementconfig = merge({}, this.element, value)
  }

  @Output() droped: EventEmitter<any> = new EventEmitter()
  @Output() ondelete: EventEmitter<any> = new EventEmitter()
  @Output() onselect: EventEmitter<any> = new EventEmitter()

  elementconfig: any
  elementstyle: any
  deleteSubscription: Subscription
  showControls: BehaviorSubject<boolean> = new BehaviorSubject(false)

  constructor(private elementRef: ElementRef, public service: FormService) {}

  ngOnDestroy(): void {
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe()
    }
  }

  ngOnInit() {
    this.element.readOnly = true
    this.deleteSubscription = this.ondelete.subscribe((el) => this.service.onItemRemoved(el))
  }

  containerClick() {
    this.showControls.next(true)
    this.onselect.emit(this.element)

    this.service.onItemSelected(this.element)
  }

  @HostListener("document:click", ["$event"])
  clickout(event: any) {
    const formContainer = this.elementRef.nativeElement.closest("#formContainer")
    if (!event.target.closest("#elementContainer") && formContainer.contains(event.target)) {
      this.service.onItemSelected(null)
    }

    if (!this.elementRef.nativeElement.contains(event.target) && formContainer.contains(event.target)) {
      this.showControls.next(false)
    }
  }
}
