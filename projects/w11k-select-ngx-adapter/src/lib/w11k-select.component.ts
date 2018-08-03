import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ConfigInstance } from 'w11k-select/lib/model/config.model';

export interface W11kSelectItem {
  label: string;
  value: any;
  children?: W11kSelectItem[];
}

/**
 * This is the public interface we expose to the Angular world. Therefore
 * there is no AngularJS migration magic exposed here, rather a regular
 * Angular Component that calls the wrapper directive. */
@Component({
  selector: 'w11k-select',
  templateUrl: './w11k-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => W11kSelectComponent),
      multi: true
    }
  ]

})
export class W11kSelectComponent<T extends W11kSelectItem> implements OnInit, ControlValueAccessor {

  /**
   * this is used to overwrite e.g. the disabled value from config
   * since this is now set via the forms api. */
  overwriteConfig: { [key: string]: any } = {};

  @Input() config: ConfigInstance | ConfigInstance[];
  @Input() options: T[];
  selected: T[];
  propagateChange: (change: T[]) => void;

  constructor() {
  }

  ngOnInit() {
  }

  registerOnChange(fn: (change: T[]) => {}): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    // todo?
  }

  setDisabledState(isDisabled: boolean): void {
    this.overwriteConfig['disabled'] = isDisabled;
  }

  writeValue(obj: T[]): void {
    this.selected = obj;
  }

}
