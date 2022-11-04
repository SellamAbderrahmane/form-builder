import {
  Directive,
  ElementRef,
  OnInit,
  OnDestroy,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { isFunction } from 'lodash-es';

import { v4 as uuid } from 'uuid';

declare type Orientation = 'x' | 'y' | 'both';
declare type ResizerHandler = 'right' | 'bottom';

@Directive({
  selector: '[resizable]',
})
export class ResizableDirective implements OnInit, OnDestroy {
  @Input() resizerId: any = uuid();
  @Input() orientation: Orientation = 'both';

  @Output() onDragend: (size: any) => void;

  private pointerdownListenner: any;
  private pointermoveListenner: any;
  private pointerupListenner: any;

  private dragging = false;
  private mouse: any = { x: 0, y: 0 };
  private rect: any = { with: 0, height: 0 };

  constructor(private el: ElementRef<HTMLElement>, private render: Renderer2) {}

  ngOnInit(): void {
    this.el.nativeElement.style.position = 'relative';

    if (this.orientation === 'x' || this.orientation === 'both') {
      const resizerElement: HTMLElement = this.render.createElement('span');
      resizerElement.classList.add('resizer');
      this.render.appendChild(this.el.nativeElement, resizerElement);

      this.pointerdownListenner = this.render.listen(
        resizerElement,
        'pointerdown',
        (e: any) => this.pointerDown(e, 'right')
      );
    }

    if (this.orientation === 'y' || this.orientation === 'both') {
      const resizerElementY: HTMLElement = this.render.createElement('span');
      resizerElementY.classList.add('resizer');
      resizerElementY.classList.add('resizer-y');
      this.render.appendChild(this.el.nativeElement, resizerElementY);
      this.pointerdownListenner = this.render.listen(
        resizerElementY,
        'pointerdown',
        (e: any) => this.pointerDown(e, 'bottom')
      );
    }
  }

  pointerDown(e: PointerEvent, handler: ResizerHandler) {
    e.preventDefault();
    this.dragging = true;
    this.mouse = {
      x: e.pageX,
      y: e.pageY,
    };
    this.rect = this.el.nativeElement.getBoundingClientRect();

    this.pointermoveListenner = this.render.listen(
      'document',
      'pointermove',
      (e: any) => this.pointermove(e, handler)
    );

    this.pointerupListenner = this.render.listen(
      'document',
      'pointerup',
      this.pointerup.bind(this)
    );
  }

  pointermove(e: PointerEvent, handler: ResizerHandler) {
    if (!this.dragging) return;

    if (handler === 'right') {
      const width = this.rect.width + (e.pageX - this.mouse.x);
      this.render.setStyle(this.el.nativeElement, 'width', `${width}px`);
    } else {
      const height = this.rect.height + (e.pageY - this.mouse.y);
      this.render.setStyle(this.el.nativeElement, 'min-height', `${height}px`);
    }
  }

  pointerup(e: PointerEvent) {
    this.dragging = false;
    this.pointermoveListenner();

    if (isFunction(this.onDragend)) {
      this.onDragend(this.rect);
    }
  }

  ngOnDestroy(): void {
    if (this.pointerdownListenner) {
      this.pointerdownListenner();
    }

    if (isFunction(this.pointerupListenner)) {
      this.pointerupListenner();
    }

    if (isFunction(this.pointermoveListenner)) {
      this.pointermoveListenner();
    }
  }
}
