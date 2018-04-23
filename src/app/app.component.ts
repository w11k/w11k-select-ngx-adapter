import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DATA_FLAT} from './data-flat.mock';
import {DATA_DEEP} from './data-deep-mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  formGroup: FormGroup;


  // just used for internal tracking whether validators are set or not - demo purpose
  required: boolean;

  dataFlat = DATA_FLAT;
  dataDeep = DATA_DEEP;


  staticConfigFlat = {
    disabled: false,
    children: 'subItems',
    header: {
      placeholder: 'Please select something'
    },
  };

  staticConfigDeep = {
    disabled: false,
    children: 'subItems',
    header: {
      placeholder: 'Please select something'
    },
  };
  dynamicConfigDeep = {
    required: true,
    multiple: true
  };

  dynamicConfigFlat = {
    required: true,
    multiple: true,
    children: undefined
  };


  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      firstName: null,
      lastName: null,
      someList: null,
      someDeepList: null,
    });
  }

  // demo purpose...
  toggleDisable() {
    this.formGroup.disabled ? this.formGroup.enable() : this.formGroup.disable();
  }

  toggleRequired() {
    Object.keys(this.formGroup.controls).forEach(key => this.formGroup.controls[key].setValidators(this.required ? null : Validators.required));
    Object.keys(this.formGroup.controls).forEach(key => this.formGroup.controls[key].updateValueAndValidity());
    this.required = !this.required;

  }
}
