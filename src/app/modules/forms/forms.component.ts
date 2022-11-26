import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop"
import { Component, OnInit, ViewEncapsulation } from "@angular/core"
import { FormControl } from "@angular/forms"
import { cloneDeep, remove } from "lodash-es"

import { Store } from "src/app/store"
import { FormsState } from "./forms.state"
import { FormsService } from "./services/forms.service"

@Component({
  selector: "forms",
  templateUrl: "forms.component.html",
  styleUrls: ["./forms.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class FormsComponent implements OnInit {
  previewMode = new FormControl(false)

  constructor(public service: FormsService, public store: Store<FormsState>) {}

  ngOnInit() {}

  droped(event: CdkDragDrop<any>) {
    const { previousContainer, container, previousIndex, currentIndex, item } = event
    item.data = this.service.onElementDroped(item.data)

    if (previousContainer !== container) {
      if (previousContainer.id === "source") {
        if (item?.data?.type === "row" && container.id !== "formContainer") {
          return
        }

        container.data.splice(currentIndex, 0, cloneDeep(item.data))
      } else {
        transferArrayItem(previousContainer.data, container.data, previousIndex, currentIndex)
      }
    } else {
      moveItemInArray(container.data, previousIndex, currentIndex)
    }

    if (previousContainer.data) {
      remove(event.previousContainer.data, { temp: true })
    }
  }

  ondelete(element: any, elementIndex: number, parent: any) {
    if (!parent?.children) return

    parent.children.splice(elementIndex, 1)
    this.store.setState({
      selectedElement: null,
    })
  }

  onselect(element: any) {
    this.store.setState({
      selectedElement: element,
    })
  }
}
