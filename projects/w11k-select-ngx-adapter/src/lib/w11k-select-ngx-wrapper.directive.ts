import {
  Directive,
  DoCheck,
  ElementRef,
  Inject,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
import { ConfigInstance } from 'w11k-select/lib/model/config.model';



/**
 * This Angular directive acts as interface for the upgraded AngularJS component.
 * Therefore it is require to map all in/outputs from AngularJS to the Angular World. */
@Directive({selector: 'w11k-select-ngx-wrapper'})
export class W11kSelectNgxWrapperDirective extends UpgradeComponent implements OnInit, OnChanges, DoCheck, OnDestroy {
  /**
   * Names of the Input (<) and output &) bindings must match the
   * names of the 'bindings' property of the component. Inputs are
   * treated as regular "Angular" inputs - outputs however are
   * functions and not event emitters! */
  @Input() options: any[];
  @Input() selected: any;
  @Input() overwriteConfig: { [key: string]: any };
  @Input() config: ConfigInstance | ConfigInstance[];
  @Output() onChange: Function;


  constructor(@Inject(ElementRef) elementRef: ElementRef, @Inject(Injector) injector: Injector) {
    super('w11kSelectNg1Wrapper', elementRef, injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
  }

  ngDoCheck() {
    super.ngDoCheck();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}

export const w11kSelectNg1WrapperComponentOptions = {
  bindings: {
    onChange: '&',
    options: '<',
    selected: '<',
    config: '<'
  },
  transclude: true,
  controller: function () {
    this.change = (change: any[]) => {
      this.onChange(change);
    };

    /**
     * Since the config already might be an array according to w11k-select AngularJS directive,
     * we currently accept an array as input too. But we do the merge it into one combined array
     * with the overwrite config that is required for setting options like disabled (we bypass this down) */
    this.mergeConfig = (value: ConfigInstance | ConfigInstance[], overwriteConfig: null | { [key: string]: any }): ConfigInstance[] => {
      return Array.isArray(value) ? [...value, overwriteConfig as ConfigInstance] : [value, overwriteConfig as ConfigInstance];
    };
  },
  template: `
<div w11k-select w11k-select-config="$ctrl.mergeConfig($ctrl.config, $ctrl.overwriteConfig)"
                         w11k-select-options="option.value as option.label for option in $ctrl.options"
                         ng-model="$ctrl.selected" name="demoField"
                         ng-change="$ctrl.change($ctrl.selected)"
                         ></div>
`
};
