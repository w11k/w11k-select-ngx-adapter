import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { setAngularJSGlobal } from '@angular/upgrade/static';
import * as angular from 'angular';
import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
/**
 * Import peer dependencies
 * */
import 'jquery/dist/jquery.js';
import 'angular/index';
import 'w11k-dropdownToggle/src/w11k-dropdownToggle.js';
import 'w11k-select/dist/w11k-select.js';


if (environment.production) {
  enableProdMode();
}

setAngularJSGlobal(angular);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
