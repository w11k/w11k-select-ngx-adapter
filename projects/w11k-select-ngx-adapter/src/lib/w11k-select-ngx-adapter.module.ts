import {NgModule} from '@angular/core';
import { w11kSelectNg1WrapperComponentOptions, W11kSelectNgxWrapperDirective } from './w11k-select-ngx-wrapper.directive';
import {W11kSelectComponent} from './w11k-select.component';

import { IModule, IRootScopeService } from 'angular';
import {UpgradeModule} from '@angular/upgrade/static';
import * as angular from 'angular';


/**
 * Needs to be exported for aot reasons. */
export function getScope(i: any): IRootScopeService {
  return i.get('$rootScope');
}

@NgModule({
  imports: [
    UpgradeModule,
  ],
  declarations: [
    W11kSelectNgxWrapperDirective,
    W11kSelectComponent
  ],
  exports: [
    W11kSelectComponent
  ],
  providers: [
    {
      provide: '$scope',
      useFactory: getScope,
      deps: ['$injector']
    },
  ]
})
export class W11kSelectNgxAdapterModule {}

export const W11kSelectNgxAdapterModuleNg1: IModule = angular.module('w11k.select.ngx-adapter', ['w11k.select']);

W11kSelectNgxAdapterModuleNg1.component('w11kSelectNg1Wrapper', w11kSelectNg1WrapperComponentOptions);
