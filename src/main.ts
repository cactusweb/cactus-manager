import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

declare global {
  interface String {
    replaceAll(searchValue: string, replaceValue: string): string;
  }
}

String.prototype.replaceAll = function (
  this: string,
  searchValue: string,
  replaceValue: string
) {
  let s = this;
  while (s.includes(searchValue)) {
    s = s.replace(searchValue, replaceValue);
  }
  return s;
};

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
