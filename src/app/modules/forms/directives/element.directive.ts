import { ComponentRef, Directive, SimpleChanges, Input, OnChanges, OnDestroy, OnInit, ViewContainerRef } from "@angular/core"
import { isNil, merge, pickBy } from "lodash-es"
import { WRAPPERS } from "src/app/ui/components"

@Directive({ selector: "[forms-element]" })
export class FormsElementDirective implements OnInit, OnDestroy, OnChanges {
  @Input() style: any
  @Input() config: any
  @Input() element: any
  @Input() previewMode: any

  compRef: ComponentRef<any>
  alwaysDisabledTypes = ["editable"]

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnInit() {
    this.loadComponent(this.elementconfig)
  }

  ngOnChanges({ config, style, previewMode }: SimpleChanges): void {
    if (style || previewMode) this.reloadComponent()
    else if (config) {
      const { currentValue, previousValue } = config
      if (currentValue?.type !== previousValue?.type) this.loadComponent(this.elementconfig)
      else this.reloadComponent()
    }
  }

  ngOnDestroy(): void {
    this.compRef.destroy()
  }

  get elementconfig() {
    const value = pickBy(this.config, (v) => !isNil(v))

    const disabled = this.alwaysDisabledTypes.includes(this.element.type) ? true : !this.previewMode
    return merge({ type: this.element.type, group: this.element.group, disabled }, value)
  }

  reloadComponent() {
    if (!this.compRef) return
    this.compRef.setInput("config", this.elementconfig)

    if (this.compRef.instance.style) {
      this.compRef.setInput("style", this.style)
    }
  }

  loadComponent(econfig: any) {
    this.viewContainerRef.clear()
    const type = typeof econfig.type === "function" ? econfig.type({}) : econfig.type
    this.compRef = this.viewContainerRef.createComponent(WRAPPERS[type])
    this.compRef.setInput("config", econfig)
    if (this.compRef.instance.style) {
      this.compRef.setInput("style", this.style)
    }
  }
}
