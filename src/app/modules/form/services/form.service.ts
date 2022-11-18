import { Injectable } from "@angular/core"
import { FormBuilder, FormGroup } from "@angular/forms"
import { Store } from "src/app/store"

import { FormState } from "../form.state"
import { FormField } from "src/app/ui/components"
import { FormConfigService } from "./config.service"

@Injectable({ providedIn: "root" })
export class FormService {
  selectedElement: any

  paramForm: FormGroup
  paramFormFields: FormField[]

  styleForm: FormGroup
  styleFormFields: FormField[]

  constructor(private fb: FormBuilder, private formconfig: FormConfigService, private store: Store<FormState>) {}

  get state(): FormState {
    return this.store.state
  }

  onItemAdded(element: any) {
    if (element.formdata) return element.formdata

    const formdata = this.formconfig.getElementFormData(element.type)

    return {
      formparam: {
        fields: formdata.param.fields,
        formgroup: this.fb.group(formdata.param.formgroup),
      },
      formstyle: {
        fields: formdata.style.fields,
        formgroup: this.fb.group(formdata.style.formgroup),
      },
    }
  }

  onItemRemoved(item: any) {
    this.paramForm = null
    this.paramFormFields = []
  }

  onItemSelected(item: any) {
    if (!item) {
      this.selectedElement = null
      this.styleForm = this.paramForm = null
      this.styleFormFields = this.paramFormFields = []
      return
    }

    this.selectedElement = item

    console.log("onItemSelected", item)

    this.paramForm = item.formparam.formgroup
    this.paramFormFields = item.formparam.fields

    this.styleForm = item.formstyle.formgroup
    this.styleFormFields = item.formstyle.fields
  }

  onSubmit() {
    console.log(this.state.formData)
  }
}
