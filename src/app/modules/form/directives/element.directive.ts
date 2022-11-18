import { ComponentRef, Directive, SimpleChanges, EventEmitter,Input, OnChanges, OnDestroy, OnInit, ViewContainerRef } from "@angular/core"
import { WRAPPERS } from "src/app/ui/components"

@Directive({ selector: "[form-element]" })
export class FormElementDirective implements OnInit, OnDestroy, OnChanges {
  @Input() style: any
  @Input() config: any
  @Input() previewMode: any

  compRef: ComponentRef<any>
  reversePreviewModeTypes = ['editable'];

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnChanges({ config, style, previewMode }: SimpleChanges): void {
    if (style || previewMode) this.reloadComponent()
    else if (config) {
      const { currentValue, previousValue } = config

      if (currentValue?.type !== previousValue?.type) this.loadComponent()
      else this.reloadComponent()
    }
  }

  ngOnInit() {
    this.loadComponent()
  }

  reloadComponent() {
    if (!this.compRef) return
    // if(this.reversePreviewModeTypes.includes(this.config.type) && this.previewMode) {
    //   this.config.readOnly = this.previewMode
    // } else {
    //   this.config.readOnly = !this.previewMode
    // }

    this.compRef.setInput("config", this.config)

    if (this.compRef.instance.style) {
      this.compRef.setInput("style", this.style)
    }
  }

  loadComponent() {
    this.viewContainerRef.clear()
    const type = typeof this.config.type === "function" ? this.config.type({}) : this.config.type
    this.compRef = this.viewContainerRef.createComponent(WRAPPERS[type])
    this.compRef.setInput("config", this.config)
    if (this.compRef.instance.style) {
      this.compRef.setInput("style", this.style)
    }
  }

  ngOnDestroy(): void {
    this.compRef.destroy()
  }
}
