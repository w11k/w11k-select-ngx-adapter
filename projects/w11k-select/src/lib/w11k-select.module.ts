import {NgModule} from '@angular/core';
import {W11kSelectWrapperDirective} from './w11k-select-wrapper.directive';
import {W11kSelectComponent} from './w11k-select.component';
import * as angular from 'angular';
import {IRootScopeService} from 'angular';
import {setAngularJSGlobal, UpgradeModule} from '@angular/upgrade/static';

setAngularJSGlobal(angular);
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
    W11kSelectWrapperDirective,
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
export class W11kSelectModule {
  constructor(upgrade: UpgradeModule) {
    upgrade.bootstrap(document.documentElement, ['ng1AppModule']);
  }
}
