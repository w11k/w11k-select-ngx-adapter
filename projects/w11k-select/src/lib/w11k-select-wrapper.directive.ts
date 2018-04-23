import {Directive, DoCheck, ElementRef, Inject, Injector, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {UpgradeComponent} from '@angular/upgrade/static';
import * as angular from 'angular';
import {IModule} from 'angular';
import {ConfigInstance} from 'w11k-select/lib/model/config.model';


/**
 * This Angular directive acts as interface for the upgraded AngularJS component.
 * Therefore it is require to map all in/outputs from AngularJS to the Angular World. */
@Directive({selector: 'w11k-select-wrapper'})
export class W11kSelectWrapperDirective extends UpgradeComponent implements OnInit, OnChanges, DoCheck, OnDestroy {
  /**
   * Names of the Input (<) and output &) bindings must match the
   * names of the 'bindings' property of the component. Inputs are
   * treated as regular "Angular" inputs - outputs however are
   * functions and not event emitters! */
  @Input() options: any[];
  @Input() selected: any;
  @Input() overwriteConfig: { [key: string]: any };
  @Output() onChange: Function;
  @Input() config: ConfigInstance | ConfigInstance[];


  constructor(@Inject(ElementRef) elementRef: ElementRef, @Inject(Injector) injector: Injector) {
    super('w11kSelectBridge', elementRef, injector);
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

export const ng1AppModule: IModule = angular.module('ng1AppModule', ['w11k.select']);


const templateModule = angular.module('w11k.select.template', []);

templateModule.run(function ($templateCache) {
  'ngInject';
  $templateCache.put('w11k-select.tpl.html', require('../../../../node_modules/w11k-select/dist/w11k-select.tpl.html'));
  $templateCache.put('w11k-select-option.tpl.html', require('../../../../node_modules/w11k-select/dist/w11k-select-option.tpl.html'));
});


ng1AppModule.component('w11kSelectBridge', {
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
     * Since the config already might be an array according to w11k-select angularjs directive,
     * we currently accept an array as input too. But we do the merge it into one combined array
     * with the overwrite config that is required for setting options like disabled (we bypass this down) */
    this.mergeConfig = (value: ConfigInstance | ConfigInstance[], overwriteConfig: null | { [key: string]: any }): ConfigInstance[] => {
      return Array.isArray(value) ? [...value, overwriteConfig as ConfigInstance] : [value, overwriteConfig as ConfigInstance];
    };
  },
  template: `



<h3>Form Control Config:</h3>
<pre>{{ $ctrl.config  | json}}</pre>
<div w11k-select w11k-select-config="$ctrl.mergeConfig($ctrl.config, $ctrl.overwriteConfig)"
                         w11k-select-options="option.value as option.label for option in $ctrl.options"
                         ng-model="$ctrl.selected" name="demoField"
                         ng-change="$ctrl.change($ctrl.selected)"
                         ></div>
                         

`
});
