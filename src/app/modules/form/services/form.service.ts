import { Injectable } from "@angular/core"
import { FormBuilder, FormGroup } from "@angular/forms"
import { StateConfig, Store } from "src/app/state"

import { FormField } from "src/app/ui/components"
import { FormState } from "../form.state"
import { FormConfigService } from "./config.service"

@Injectable({ providedIn: "root" })
export class FormService {
  paramForm: FormGroup
  paramFormFields: FormField[]

  styleForm: FormGroup
  styleFormFields: FormField[]

  constructor(private fb: FormBuilder, private formconfig: FormConfigService, private store: Store<StateConfig<FormState>>) {}

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
      this.styleForm = this.paramForm = null
      this.styleFormFields = this.paramFormFields = []
      return
    }

    this.paramForm = item.formparam.formgroup
    this.paramFormFields = item.formparam.fields

    this.styleForm = item.formstyle.formgroup
    this.styleFormFields = item.formstyle.fields
  }

  onSubmit() {
    console.log(this.state.formData)
  }
}
