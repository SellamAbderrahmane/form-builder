import { FormItem } from "../../form.interface"

export interface CheckboxConfig extends FormItem {
  checked?: boolean
  group?: boolean
  indeterminate?: boolean
}
