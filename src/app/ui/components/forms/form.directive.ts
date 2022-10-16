import {
  Directive,
  ViewContainerRef,
  Input,
  ComponentFactoryResolver,
  OnDestroy,
  ComponentRef,
  OnInit,
  EventEmitter,
  Output,
  ChangeDetectorRef,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { isFunction } from 'lodash-es';
import { FormField, WRAPPERS } from './form.interface';

@Directive({
  selector: '[form-field]',
})
export class FormDirective implements OnInit, OnDestroy {
  compRef: ComponentRef<any>;
  @Input('field') field: FormField;
  @Input('formControl') formControl: FormControl;
  @Input('model') model: any;
  @Input() formChange: EventEmitter<any> = new EventEmitter<any>();

  onChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private viewContainerRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    if(this.formControl.value) {
      if (isFunction(this.field.onChange)) this.field.onChange(this.formControl.value);
    }

    this.formChange.subscribe(_ => {
      this.loadComponent();
    });

    this.onChange.subscribe((value: any) => {
      if (isFunction(this.field.onChange)) this.field.onChange(value);
    });

    this.field.changeType = (type) => {
      this.field.type = type;
      this.field.value = null;
      this.formControl.setValue(null);
      this.loadComponent();
    }

    this.loadComponent();
  }

  ngOnDestroy(): void {
    this.compRef.destroy();
  }

  loadComponent() {
    this.viewContainerRef.clear();
    const type = typeof this.field.type === 'function' ? this.field.type(this.model) : this.field.type;
    const comp: any = this.resolver.resolveComponentFactory(WRAPPERS[type] || WRAPPERS['text']);
    this.compRef = this.viewContainerRef.createComponent(comp);

    if (this.field.type === 'checkbox') {
      this.compRef.instance.group = this.field.itemGroup;
    } else this.compRef.instance.config = this.field;

    this.compRef.instance.formControl = this.formControl;
    this.compRef.instance.onChange = this.onChange;
  }
}
