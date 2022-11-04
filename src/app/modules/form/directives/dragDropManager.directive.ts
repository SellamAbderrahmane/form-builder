import { Directive, OnInit, OnDestroy, Injectable } from "@angular/core"
import { CdkDropList } from "@angular/cdk/drag-drop"
import { Subscription, map, BehaviorSubject, Observable } from "rxjs"

@Injectable()
export class DragDropManagerService {
  private list = new BehaviorSubject<string[]>([])

  onListChange = (): Observable<string[]> => this.list.asObservable()

  constructor() {}

  register = (id: string) => {
    if (!id || this.list.value.includes(id)) {
      return
    }

    this.list.next([id, ...this.list.value])
  }

  unregister = (id: string) => {
    this.list.next(this.list.value.filter((x) => x !== id))
  }
}

@Directive({
  selector: "[dragAndDropManager]"
})
export class DragDropManagerDirective implements OnInit, OnDestroy {
  private manager!: Subscription

  constructor(private dropList: CdkDropList, private managerService: DragDropManagerService) {}

  ngOnInit(): void {
    this.managerService.register(this.dropList.id)

    this.manager = this.managerService.onListChange().subscribe((list) => {
      this.dropList.connectedTo = list
    })
  }

  ngOnDestroy(): void {
    this.managerService.unregister(this.dropList.id)
    this.manager.unsubscribe()
  }
}
