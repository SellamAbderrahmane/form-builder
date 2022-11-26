import { Injectable } from "@angular/core"
import { reduce } from "lodash-es"

import { FormsState } from "../forms.state"
import { Store } from "src/app/store"
import { FormBuilder } from "@angular/forms"
import { v4 } from "uuid"

@Injectable()
export class FormsConfigService {
  constructor(private store: Store<FormsState>, private fb: FormBuilder) {}

  async init() {
    this.store.setState({
      loading: true,
    })

    const formElements = await this.loadFormElements()
    const formElementParams = await this.loadFormElementsParams()

    this.store.setState({
      formElements,
      formElementParams,
      loading: false,
    })

    return Promise.resolve(this.store.state)
  }

  async loadFormElements() {
    return [
      {
        icon: "pic-left",
        children: [
          {
            id: v4(),
            type: "row",
            menuConfig: {
              class: "input",
              name: "1 Column",
              icon: "font-size",
            },
            children: [
              {
                type: "column",
                name: "1 Column",
                class: "input",
                children: [],
              },
            ],
          },
          {
            id: v4(),
            type: "row",
            menuConfig: {
              class: "input",
              name: "2 Column",
              icon: "font-size",
            },
            children: [
              {
                type: "column",
                name: "Column 1",
                class: "input",
                children: [],
              },
              {
                type: "column",
                name: "Column 2",
                class: "input",
                children: [],
              },
            ],
          },
          {
            id: v4(),
            type: "row",
            menuConfig: {
              class: "input",
              name: "3 Column",
              icon: "font-size",
            },
            children: [
              {
                type: "column",
                name: "Column 1",
                class: "input",
                children: [],
              },
              {
                type: "column",
                name: "Column 2",
                class: "input",
                children: [],
              },
              {
                type: "column",
                name: "Column 3",
                class: "input",
                children: [],
              },
            ],
          },
          {
            id: v4(),
            type: "row",
            menuConfig: {
              class: "input",
              name: "4 Column",
              icon: "font-size",
            },
            children: [
              {
                type: "column",
                name: "Column 1",
                class: "input",
                children: [],
              },
              {
                type: "column",
                name: "Column 2",
                class: "input",
                children: [],
              },
              {
                type: "column",
                name: "Column 3",
                class: "input",
                children: [],
              },
              {
                type: "column",
                name: "Column 4",
                class: "input",
                children: [],
              },
            ],
          },
        ],
      },
      {
        icon: "setting",
        children: [
          {
            id: v4(),
            type: "editable",
            menuConfig: {
              name: "Text",
              icon: "font-size",
            },
          },
          {
            id: v4(),
            type: "text",
            menuConfig: {
              name: "Paragraph",
              icon: "font-size",
            },
          },
          {
            id: v4(),
            type: "number",
            menuConfig: {
              name: "Number field",
              icon: "font-size",
            },
          },
          {
            id: v4(),
            type: "select",
            defaultConfig: {
              disabled: true,
            },
            menuConfig: {
              name: "Drop-down",
              icon: "font-size",
            },
          },
          {
            id: v4(),
            type: "checkbox",
            group: true,
            menuConfig: {
              name: "Checkbox options",
              icon: "font-size",
            },
          },
          {
            id: v4(),
            type: "date",
            menuConfig: {
              name: "Date",
              icon: "font-size",
            },
          },
        ],
      },
    ]
  }

  async loadFormElementsParams() {
    return {
      input: {
        param: [
          {
            span: 24,
            group: true,
            key: "label",
            type: "text",
            // prefixIcon: "lock",
            label: "Label",
            placeholder: "Label",
          },
          {
            span: 24,
            group: true,
            type: "text",
            key: "placeholder",
            label: "Placeholder",
            placeholder: "Enter placeholder",
          },
          {
            span: 24,
            group: true,
            type: "text",
            key: "description",
            label: "Description",
            placeholder: "Enter description",
          },
          {
            span: 24,
            key: "required",
            type: "checkbox",
            label: "Required",
          },
        ],
        style: [],
      },
      editable: {
        param: [
          {
            span: 24,
            group: true,
            type: "text",
            key: "value",
            value: "Untitled",
            label: "Title",
            placeholder: "Enter title",
          },
        ],
        style: [
          {
            span: 24,
            group: true,
            key: "text-align",
            type: "select",
            label: "Text Align",
            value: "left",
            placeholder: "Text Align",
            options: [
              { label: "Left", value: "left" },
              { label: "Center", value: "center" },
              { label: "Right", value: "right" },
            ],
          },
          {
            span: 24,
            group: true,
            key: "font-size",
            type: "text",
            value: "15px",
            label: "Font size",
            pattern: "^[0-9]*(s)?{rem|px|em}$",
            placeholder: "Font size",
          },
        ],
      },
      select: {
        param: [
          {
            span: 24,
            group: true,
            key: "label",
            type: "text",
            // prefixIcon: "lock",
            label: "Label",
            placeholder: "Label",
          },
          {
            span: 24,
            group: true,
            type: "text",
            key: "placeholder",
            label: "Placeholder",
            placeholder: "Enter placeholder",
          },
          {
            span: 24,
            group: true,
            type: "text",
            key: "description",
            label: "Description",
            placeholder: "Enter description",
          },
          {
            span: 24,
            key: "required",
            type: "checkbox",
            label: "Required",
          },
          {
            span: 24,
            group: true,
            key: "options",
            type: "selectOptions",
            label: "Options",
            placeholder: "Add option",
          },
        ],
        style: [],
      },
      checkbox: {
        param: [
          {
            span: 24,
            group: true,
            key: "label",
            type: "text",
            // prefixIcon: "lock",
            label: "Label",
            placeholder: "Label",
          },
          {
            span: 24,
            group: true,
            type: "text",
            key: "description",
            label: "Description",
            placeholder: "Enter description",
          },
          {
            span: 24,
            key: "required",
            type: "checkbox",
            label: "Required",
          },
          {
            span: 24,
            key: "value",
            type: "checkboxOptions",
            label: "Options",
            value: [{ label: "Option 1", value: "Option 1" }],
            placeholder: "Add option",
          },
        ],
      },
      date: {
        param: [
          {
            span: 24,
            group: true,
            key: "label",
            type: "text",
            // prefixIcon: "lock",
            label: "Label",
            placeholder: "Label",
          },
          {
            span: 24,
            group: true,
            type: "text",
            key: "placeholder",
            label: "Placeholder",
            placeholder: "Enter placeholder",
          },
          {
            span: 24,
            group: true,
            type: "text",
            key: "description",
            label: "Description",
            placeholder: "Enter description",
          },
          {
            span: 24,
            key: "required",
            type: "checkbox",
            label: "Required",
          },
        ],
        style: [],
      },
    }
  }

  generateElementGroup(fields: any[]) {
    return reduce(
      fields,
      (acc, p) => {
        acc[p.key] = Array.isArray(p.value) ? [p.value] : p.value
        return acc
      },
      {}
    )
  }

  getElementFormdata(type: any) {
    const { formElementParams } = this.store.state
    let object = formElementParams[type]
    if (["text", "input", "number"].includes(type)) {
      object = formElementParams.input
    }

    if (!object) {
      return {
        paramfields: [],
        paramgroup: this.fb.group({}),
        stylefields: [],
        stylegroup: this.fb.group({}),
      }
    }

    const paramgroup = this.generateElementGroup(object.param)
    const stylegroup = this.generateElementGroup(object.style)

    return {
      paramfields: object.param,
      paramgroup: this.fb.group(paramgroup),
      stylefields: object.style,
      stylegroup: this.fb.group(stylegroup),
    }
  }
}
