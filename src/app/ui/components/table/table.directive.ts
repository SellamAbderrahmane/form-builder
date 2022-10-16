import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  EmbeddedViewRef,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { ITableCellComponent, TableTemplate } from './table.interface';

@Directive({ selector: '[cell-render]' })
export class TableCellRender implements OnInit, OnDestroy {
  compRef: ComponentRef<ITableCellComponent<any>> | EmbeddedViewRef<any>;

  @Input('template') template: TableTemplate;
  @Input('context') context: any;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.loadComponent();
  }

  loadComponent() {
    this.viewContainerRef.clear();

    if (this.template instanceof TemplateRef) {
      this.compRef = this.viewContainerRef.createEmbeddedView(this.template);
      this.compRef.context = this.context;
      return;
    }

    const comp: any = this.resolver.resolveComponentFactory(this.template);
    this.compRef = this.viewContainerRef.createComponent(comp);

    this.compRef.instance.init(this.context);
  }

  ngOnDestroy(): void {
    this.compRef.destroy();
  }
}
