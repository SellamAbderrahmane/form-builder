import { Injectable } from "@angular/core"
import { keyBy, mapValues } from "lodash-es"

import { HttpService } from "src/app/shared"
import { FormState, FORM_ELEM_PARAM } from "../form.state"
import { StateConfig, Store } from "src/app/state"

@Injectable()
export class FormConfigService {
  constructor(private http: HttpService, private store: Store<StateConfig<FormState>>) {}

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
                icon: "font-size",
                children: [],
                style: {
                  border: "1px solid red",
                  cursor: "pointer",
                },
              },
            ],
          },
          {
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
                icon: "font-size",
                children: [],
                style: {
                  border: "1px solid red",
                  cursor: "pointer",
                },
              },
              {
                type: "column",
                name: "Column 2",
                class: "input",
                icon: "font-size",
                children: [],
                style: {
                  border: "1px solid red",
                  cursor: "pointer",
                },
              },
            ],
          },
          {
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
                icon: "font-size",
                children: [],
                style: {
                  border: "1px solid red",
                  cursor: "pointer",
                },
              },
              {
                type: "column",
                name: "Column 2",
                class: "input",
                icon: "font-size",
                children: [],
                style: {
                  border: "1px solid red",
                  cursor: "pointer",
                },
              },
              {
                type: "column",
                name: "Column 3",
                class: "input",
                icon: "font-size",
                children: [],
                style: {
                  border: "1px solid red",
                  cursor: "pointer",
                },
              },
            ],
          },
        ],
      },
      {
        icon: "setting",
        children: [
          {
            type: "editable",
            value: "Untitled",
            menuConfig: {
              name: "Text",
              icon: "font-size",
            },
            style: {
              border: "1px solid red",
              cursor: "pointer",
            },
          },
          {
            type: "text",
            menuConfig: {
              name: "Text field",
              icon: "font-size",
            },
            style: {
              border: "1px solid red",
              cursor: "pointer",
            },
          },
          {
            type: "number",
            menuConfig: {
              name: "Number field",
              icon: "font-size",
            },
            style: {
              border: "1px solid red",
              cursor: "pointer",
            },
          },
          {
            type: "select",
            menuConfig: {
              name: "Drop-down",
              icon: "font-size",
            },
            style: {
              border: "1px solid red",
              cursor: "pointer",
            },
          },
          {
            type: "checkbox",
            label: "ff",
            group: true,
            value: [
              { label: "Apple", value: "Apple", checked: true },
              { label: "Pear", value: "Pear", checked: false },
            ],
            menuConfig: {
              name: "Checkbox",
              icon: "font-size",
            },
            style: {
              border: "1px solid red",
              cursor: "pointer",
            },
          },
          {
            type: "date",
            menuConfig: {
              name: "Date",
              icon: "font-size",
            },
            style: {
              border: "1px solid red",
              cursor: "pointer",
            },
          },
        ],
      },
    ]
  }

  async loadFormElementsParams() {
    return {
      input: {
        label: {
          span: 24,
          group: true,
          key: "label",
          type: "text",
          // prefixIcon: "lock",
          label: "Label",
          placeholder: "Label",
        },
        placeholder: {
          span: 24,
          group: true,
          type: "text",
          key: "placeholder",
          label: "Placeholder",
          placeholder: "Enter placeholder",
        },
        description: {
          span: 24,
          group: true,
          type: "text",
          key: "description",
          label: "Description",
          placeholder: "Enter description",
        },
      },
      editable: {
        value: {
          span: 24,
          group: true,
          type: "text",
          key: "value",
          value: "Untitled",
          label: "Title",
          placeholder: "Enter title",
        },
        textAlign: {
          span: 24,
          group: true,
          key: "textAlign",
          type: "select",
          label: "Text Align",
          value: 'left',
          isStyle: true,
          placeholder: "Text Align",
          options: [
            { label: "Center", value: "center" },
            { label: "Left", value: "left" },
            { label: "Right", value: "right" },
          ],
        },
      },
      date: {
        dateMode: {
          span: 24,
          group: true,
          key: "dateMode",
          type: "select",
          label: "Type",
          placeholder: "Type",
          options: [
            { label: "Week", value: "week" },
            { label: "Month", value: "month" },
          ],
        },
      },
      select: {},
    }
  }

  getElementFormData(type: any) {
    const { formElementParams } = this.store.state

    switch (type) {
      case "text":
      case "password":
      case "number":
        return {
          fields: Object.values(formElementParams.input),
          formgroup: mapValues(keyBy(Object.keys(formElementParams.input)), (k) => formElementParams.input[k]?.value),
        }
      default: {
        const object = formElementParams[type]
        if (!object)
          return {
            fields: [],
            formgroup: {},
          }

        return {
          fields: Object.values(formElementParams[type]),
          formgroup: mapValues(keyBy(Object.keys(formElementParams[type])), (k) => formElementParams[type][k]?.value),
        }
      }
    }
  }
}
