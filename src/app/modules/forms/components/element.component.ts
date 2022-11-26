import { Component, OnInit, Input, Output, EventEmitter, ElementRef, HostListener } from "@angular/core"
import { isNil, merge, pickBy } from "lodash"

@Component({
  selector: "forms-element",
  template: `
    <nz-form-item
      cdkDrag
      id="elementContainer"
      [cdkDragData]="element"
      (click)="containerClick()"
      [cdkDragDisabled]="previewMode"
      [ngClass]="{ 'active-container': showControls && !previewMode }"
    >
      <nz-form-label *ngIf="config.label" [nzRequired]="config.required" [nzFor]="element.key">
        <span>{{ config.label }}</span>
      </nz-form-label>
      <nz-form-control [nzExtra]="config.description">
        <ng-template forms-element ngDefaultControl [element]="element" [config]="config" [style]="style" [previewMode]="previewMode"></ng-template>
      </nz-form-control>

      <div class="element-controls" *ngIf="showControls && !previewMode">
        <button nz-button nzSize="small" nzDanger nzShape="circle" (click)="ondelete.emit(element)">
          <i nz-icon nzType="delete"></i>
        </button>
        <button nz-button nzSize="small" cdkDragHandle nzShape="circle">
          <i nz-icon nzType="drag"></i>
        </button>
      </div>
      <span *cdkDragPreview>{{ element?.name }}</span>
      <div class="drag-placeholder" *cdkDragPlaceholder></div>
    </nz-form-item>
  `,
})
export class FormElementComponent implements OnInit {
  @Input() style: any
  @Input() config: any
  @Input() element: any
  @Input() previewMode: boolean

  @Output() ondelete: EventEmitter<any> = new EventEmitter()
  @Output() onselect: EventEmitter<any> = new EventEmitter()
  showControls: boolean

  constructor(private elementRef: ElementRef) {}

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
