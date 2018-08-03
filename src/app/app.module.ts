import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import { UpgradeModule } from '@angular/upgrade/static';

import * as angular from 'angular';
import { W11kSelectNgxAdapterModuleNg1, W11kSelectNgxAdapterModule } from 'w11k-select-ngx-adapter';

const appModuleNg1 = angular.module('appModuleNg1', [W11kSelectNgxAdapterModuleNg1.name, 'w11k.select', 'w11k.select.template']);

const templateModule = angular.module('w11k.select.template', []);

templateModule.run(function ($templateCache) {
  'ngInject';
  $templateCache.put('w11k-select.tpl.html', require('../../node_modules/w11k-select/dist/w11k-select.tpl.html'));
  $templateCache.put('w11k-select-option.tpl.html', require('../../node_modules/w11k-select/dist/w11k-select-option.tpl.html'));
});

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    W11kSelectNgxAdapterModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(upgrade: UpgradeModule) {
    upgrade.bootstrap(document.documentElement, [appModuleNg1.name]);
  }
}
