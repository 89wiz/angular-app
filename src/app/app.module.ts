// Angular Core
import { ApplicationRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

// Angular Web Component
import { Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

// Custom
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: []
})
export class AppModule {
  constructor(private injector: Injector) {
    const el = createCustomElement(AppComponent, { injector });
    customElements.define('angular-app', el);
  }

  public ngDoBootstrap(appRef: ApplicationRef): void {
    if (document.querySelector('app-root')) {
      appRef.bootstrap(AppComponent);
    }
  }
}
