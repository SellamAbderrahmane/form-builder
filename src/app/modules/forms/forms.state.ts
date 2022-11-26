export type FORM_ELEM_PARAM = { [key: string]: { [key: string]: any } }

export interface FormsState {
  loading?: boolean
  formData?: any
  formElements?: any[]
  selectedElement?: any
  formElementParams?: FORM_ELEM_PARAM
}

export const initialState: FormsState = {
  loading: false,
  formData: {
    children: [],
  },
  selectedElement: null,
  formElements: [],
  formElementParams: {},
}
