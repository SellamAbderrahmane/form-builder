import { ComponentRef, Directive, SimpleChanges, Input, OnChanges, OnDestroy, OnInit, ViewContainerRef } from "@angular/core"
import { FormField, INPUTS, WRAPPERS } from "src/app/ui/components"

@Directive({ selector: "[form-element]" })
export class FormElementDirective implements OnInit, OnDestroy, OnChanges {
  @Input() style: any
  @Input() config: FormField
  compRef: ComponentRef<any>

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnChanges({ config, style }: SimpleChanges): void {
    console.log(style);
    
    const { currentValue, previousValue } = config

    if (currentValue?.type !== previousValue?.type) this.loadComponent()
    else this.reloadComponent()
  }

  ngOnInit() {
    this.loadComponent()
  }

  reloadComponent() {
    if (!this.compRef) return

    this.compRef.setInput("config", this.config)
    this.compRef.setInput("style", this.style)
  }

  loadComponent() {
    this.viewContainerRef.clear()
    const type = typeof this.config.type === "function" ? this.config.type({}) : this.config.type
    this.compRef = this.viewContainerRef.createComponent(WRAPPERS[type])
    this.compRef.setInput("config", this.config)
    this.compRef.setInput('style', this.style)

    // if (this.element.type === 'checkbox') {
    //   this.compRef.instance.group = this.element.itemGroup;
    // } else this.compRef.instance.config = this.element;

    // this.compRef.instance.formControl = this.formControl;
    // this.compRef.instance.onChange = this.onChange;
  }

  ngOnDestroy(): void {
    this.compRef.destroy()
  }
}
