import { StateConfig } from "src/app/state"
import { FormField } from "src/app/ui/components"

export type FORM_ELEM_PARAM = { [key: string]: { [key: string]: FormField & any } }

export interface FormState {
  loading?: boolean
  formData?: any
  formElements?: any[]
  formElementParams?: FORM_ELEM_PARAM
}

export type SForm = StateConfig<FormState>

export const initialState: FormState = {
  loading: false,
  formData: {
    children: [],
  },
  formElements: [],
  formElementParams: {},
}