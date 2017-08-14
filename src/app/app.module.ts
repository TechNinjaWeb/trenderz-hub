// Dependent Module Declarations
import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG, Title, Meta } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { AccordionModule } from 'primeng/primeng';     //accordion and accordion tab
import { MenuItem } from 'primeng/primeng';            //api

import { HttpModule } from '@angular/http';

// External Modules
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { LocalStorageModule } from 'angular-2-local-storage';

// Internal Modules
import { AppRouter } from './app.router';
// Component Declarations

// Provider Declarations
import { SeoService } from './common/seo';
import { ParseService } from './providers/parse-service/parse-service';
import { AuthService } from './providers/auth/auth';
import { UserProvider } from './providers/user/user';
import { DomInjectableService } from './providers/dom-injectable-service/dom-injectable-service';
import { DebugProvider } from './providers/debug/debug';

// Page Declarations
import { AppComponent } from './app.component';


export class MyHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
      'swipe': {velocity: 0.4, threshold: 20} // override default settings
  }
}

// Primary App Module
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'th-app'}),
    BrowserAnimationsModule,
    AppRouter,
    ToastModule.forRoot(),
    LocalStorageModule.withConfig({
        prefix: 'th',
        storageType: 'localStorage',
        notifyOptions: {
          setItem: true,
          removeItem: true
        }
    }),
    HttpModule,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AppComponent,
  ],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG,  useClass: MyHammerConfig  },
    UserProvider,
    AuthService,
    DomInjectableService,
    ParseService,
    DebugProvider,
    Title,
    SeoService,
    Meta,
  ]
})
export class AppModule {}
