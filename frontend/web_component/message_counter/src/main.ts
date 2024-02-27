// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { ApplicationRef } from '@angular/core';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

(async () => {
  const app: ApplicationRef = await createApplication(appConfig);

// Define Web Components
const messageCounter = createCustomElement(AppComponent, { injector: app.injector });
  customElements.define('message-counter', messageCounter);
})();