import { Injectable } from "@angular/core"
import { keyBy, mapValues } from "lodash-es"

import { FormState } from "../form.state"
import { HttpService } from "src/app/shared"
import { Store, StoreService } from "src/app/store"
import { APPCONFIG } from "src/app/shared/config"

@Injectable()
export class FormConfigService {
  gconfig: APPCONFIG

  constructor(private http: HttpService, private store: Store<FormState>, public storeService: StoreService) {
    storeService.select("config").subscribe((c) => {
      this.gconfig = c
    })
  }

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
                children: [],
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
            type: "editable",
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
        param: {
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
        style: {},
      },
      editable: {
        param: {
          value: {
            span: 24,
            group: true,
            type: "text",
            key: "value",
            value: "Untitled",
            label: "Title",
            placeholder: "Enter title",
          },
        },
        style: {
          "text-align": {
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
          "font-size": {
            span: 24,
            group: true,
            key: "font-size",
            type: "text",
            value: "15px",
            label: "Font size",
            pattern: "^[0-9]*(s)?{rem|px|em}$",
            placeholder: "Font size",
          },
        },
      },
      // date: {
      //   dateMode: {
      //     span: 24,
      //     group: true,
      //     key: "dateMode",
      //     type: "select",
      //     label: "Type",
      //     placeholder: "Type",
      //     options: [
      //       { label: "Week", value: "week" },
      //       { label: "Month", value: "month" },
      //     ],
      //   },
      // },
      // select: {},
    }
  }

  getElementFormData(type: any) {
    const { formElementParams } = this.store.state

    switch (type) {
      case "text":
      case "password":
      case "number":
        const param = {
          fields: Object.values(formElementParams.input.param),
          formgroup: mapValues(keyBy(Object.keys(formElementParams.input.param)), (k) => formElementParams.input.param[k]?.value),
        }

        const style = {
          fields: Object.values(formElementParams.input.style),
          formgroup: mapValues(keyBy(Object.keys(formElementParams.input.style)), (k) => formElementParams.input.style[k]?.value),
        }

        return { param, style }
      default: {
        const object = formElementParams[type]
        if (!object)
          return {
            param: {
              fields: [],
              formgroup: {},
            },
            style: {
              fields: [],
              formgroup: {},
            },
          }

        const param = {
          fields: Object.values(formElementParams[type].param),
          formgroup: mapValues(keyBy(Object.keys(formElementParams[type].param)), (k) => formElementParams[type].param[k]?.value),
        }

        const style = {
          fields: Object.values(formElementParams[type].style),
          formgroup: mapValues(keyBy(Object.keys(formElementParams[type].style)), (k) => formElementParams[type].style[k]?.value),
        }

        return { param, style }
      }
    }
  }
}
