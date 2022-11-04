import { Component, OnInit } from "@angular/core"
import { cloneDeep } from "lodash-es"
import { CdkDragDrop, CdkDragExit, copyArrayItem, transferArrayItem, moveItemInArray } from "@angular/cdk/drag-drop"

import { ConfigService } from "src/app/shared"
import { FormService } from "./services/form.service"

@Component({
  selector: "app-form",
  templateUrl: "form.component.html",
  styleUrls: ["./form.component.scss"],
})
export class FormComponent implements OnInit {
  constructor(public config: ConfigService, public service: FormService) {}

  ngOnInit() {}

  droped(event: CdkDragDrop<any>) {
    const { previousContainer, container, previousIndex, currentIndex, item } = event

    const { formstyle, formparam } = this.service.onItemAdded(item.data)
    item.data.formparam = formparam
    item.data.formstyle = formstyle

    if (previousContainer !== container) {
      if (previousContainer.id === "source") {
        if (item?.data?.type === "row" && container.id !== "formContainer") {
          return
        }

        container.data.splice(currentIndex, 0, cloneDeep(item.data))
        // copyArrayItem(previousContainer.data, container.data, previousIndex, currentIndex)
      } else {
        transferArrayItem(previousContainer.data, container.data, previousIndex, currentIndex)
      }
    }

    // if (previousContainer.data) {
    //   // remove(event.previousContainer.data, { temp: true });
    // }
  }

  exited(event: CdkDragExit<any>, paramIndex: number) {
    // const index = event.container.data.findIndex(
    //   (el: any) => el.id === event.item.data.id
    // );
    // this.formParams[paramIndex].children.splice(index, 0, {
    //   ...event.item.data,
    //   temp: true,
    // });
  }

  entered(event: any) {
    // remove(event.item.data, { temp: true })
  }

  ondelete({ element, elementIndex, parent }: any) {
    if (!parent?.children) return

    parent.children.splice(elementIndex, 1)
    this.service.onItemRemoved(element)
  }

  onselect(element: any) {
    this.service.onItemSelected(element)
  }
}
