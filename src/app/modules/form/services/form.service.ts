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

  constructor(private fb: FormBuilder, private formconfig: FormConfigService, private store: Store<StateConfig<FormState>>) {}

  get state(): FormState {
    return this.store.state
  }

  onItemAdded(element: any) {
    if(element.formdata) return element.formdata
    
    const formdata = this.formconfig.getElementFormData(element.type)
console.log(formdata);

    return {
      fields: formdata.fields,
      formgroup: this.fb.group(formdata.formgroup),
    }
  }

  onItemRemoved(item: any) {
    this.paramForm = null
    this.paramFormFields = []
  }

  onItemSelected(item: any) {
    if (!item) {
      this.paramForm = null
      this.paramFormFields = []
      return
    }

    this.paramForm = item.formdata.formgroup
    this.paramFormFields = item.formdata.fields
  }

  onSubmit() {
    console.log(this.state.formData);
    
  }
}
