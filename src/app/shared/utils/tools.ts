import { EventEmitter } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import {
  ButtonConfig,
  FormField,
  FormConfig,
  TransferConfig,
  TreeConfig,
  UploadConfig,
  TagsConfig,
  INPUTS,
  TableHeadConfig,
  TableSetting,
} from 'src/app/ui/components';

export abstract class Tools {
  form: FormGroup;
  fields: FormField[];
  actions: ButtonConfig[];
  formMode: 'ADD' | 'EDIT';
  options: FormConfig;
  onFormChange: EventEmitter<any>;

  tableSettings: TableSetting;
  columnDefs: TableHeadConfig[];
  tags: TagsConfig;
  transfer: TransferConfig;
  upload: UploadConfig;
  tree: TreeConfig;

  visibleDrawer: boolean;
  visibleModal: boolean;

  pageSize: number;

  constructor() {
    this.form = new FormGroup({});
    this.fields = [];
    this.actions = [];
    this.options = {};
    this.transfer = {};
    this.tree = {};
    this.upload = {
      fileList: [],
    };
    this.tags = {
      list: [],
    };
    this.visibleDrawer = false;
    this.visibleModal = false;
    this.formMode = 'ADD';
    this.pageSize = 20;
    this.onFormChange = new EventEmitter();

    this.tableSettings = {
      breakWord: false,
      bordered: false,
      pagination: true,
      sizeChanger: false,
      expandable: false,
      checkbox: false,
      fixHeader: false,
      noResult: false,
      ellipsis: false,
      simple: false,
      size: 'small',
      paginationType: 'default',
      tableScroll: 'scroll',
      tableLayout: 'fixed',
      position: 'bottom',
      queryParams: (params) => {},
      pageSizeChange: (index) => {},
      pageIndexChange: (index) => {},
      currentPageDataChange: (data) => {},
    };
  }

  removeField(key: string) {
    if (this.fields) {
      this.fields = this.fields.filter((el) => el.key != key);
    }
  }

  markGroupDirty(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      switch (formGroup.get(key).constructor.name) {
        case 'FormGroup':
          this.markGroupDirty(formGroup.get(key) as FormGroup);
          break;
        case 'FormArray':
          this.markArrayDirty(formGroup.get(key) as FormArray);
          break;
        case 'FormControl':
          this.markControlDirty(formGroup.get(key) as FormControl);
          formGroup.get(key).updateValueAndValidity();
          break;
      }
    });
  }

  markArrayDirty(formArray: FormArray) {
    formArray.controls.forEach((control) => {
      switch (control.constructor.name) {
        case 'FormGroup':
          this.markGroupDirty(control as FormGroup);
          break;
        case 'FormArray':
          this.markArrayDirty(control as FormArray);
          break;
        case 'FormControl':
          this.markControlDirty(control as FormControl);
          break;
      }
    });
  }

  markControlDirty(formControl: FormControl) {
    formControl.markAsDirty();
    formControl.updateValueAndValidity();
  }

  changeInputType(type: INPUTS, fieldKey: string) {
    const field = this.fields.find((item) => item.key === fieldKey);
    if (field?.changeType) {
      field.changeType(type);
    }
  }

  generateCUDArray(oldArr: any[], newArr: any[], key: string) {
    const oldItems = [];
    return [...oldArr, ...newArr].reduce(
      (acc, item) => {
        if (oldItems.includes(item[key])) return acc;

        if (!item[key]) {
          acc.toCreate.push(item);
          return acc;
        }

        const current = newArr.find((cv) => item[key] === cv[key]);

        if (!current) {
          acc.toDelete.push(item);
        } else {
          acc.toUpdate.push(current);
        }

        oldItems.push(item[key]);
        return acc;
      },
      {
        toUpdate: [],
        toDelete: [],
        toCreate: [],
      }
    );
  }
}

export abstract class IDmsComponent {
  crudStates = {
    create: 'create',
    default: 'default',
    deleted: 'deleted',
    updated: 'updated'
  }
}