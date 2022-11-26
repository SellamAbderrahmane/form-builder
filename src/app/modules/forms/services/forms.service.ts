import { Injectable } from "@angular/core"
import { each, map } from "lodash-es"
import { Observable } from "rxjs"
import { HttpService } from "src/app/shared"
import { Store } from "src/app/store"

import { FormsState } from "../forms.state"
import { FormsConfigService } from "./config.service"

@Injectable({ providedIn: "root" })
export class FormsService {
  state: Observable<FormsState>

  constructor(private http: HttpService, private formconfig: FormsConfigService, public store: Store<FormsState>) {}

  onElementDroped(element: any) {
    if (element.paramgroup && element.stylegroup) {
      return element
    }

    const { paramfields, paramgroup, stylefields, stylegroup } = this.formconfig.getElementFormdata(element.type)

    element.paramfields = paramfields
    element.paramgroup = paramgroup
    element.stylefields = stylefields
    element.stylegroup = stylegroup

    return element
  }

  getElementData(formElement: any) {
    const { paramgroup, paramfields, stylegroup, stylefields, ...rest } = formElement
    if (paramgroup?.invalid || stylegroup?.invalid) {
      throw new Error("Form invalid.")
    }

    if (!rest.children) {
      return {
        type: rest.type,
        class: rest.class,
        param: paramgroup.value,
        style: stylegroup.value,
      }
    }

    return {
      type: rest?.type,
      children: map(rest.children, (child) => this.getElementData(child)),
    }
  }

  async onSubmit() {
    const data = this.getElementData(this.store.state.formData)
    console.log(data)
    this.store.setState({ loading: true })
    const result = await this.http.fetch({
      method: "POST",
      url: "/form/create",
      data: data,
    })

    this.store.setState({ loading: false })
    console.log(result)
  }
}
