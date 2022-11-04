import { ComponentRef, Directive, SimpleChanges, Input, OnChanges, OnDestroy, OnInit, ViewContainerRef } from "@angular/core"
import { WRAPPERS } from "src/app/ui/components"

@Directive({ selector: "[form-element]" })
export class FormElementDirective implements OnInit, OnDestroy, OnChanges {
  @Input() style: any
  @Input() config: any
  compRef: ComponentRef<any>

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnChanges({ config, style }: SimpleChanges): void {
    if (style) this.reloadComponent()
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
