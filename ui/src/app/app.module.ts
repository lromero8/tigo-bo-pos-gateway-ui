import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';
import { AppSettings } from './app.settings';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './theme/components/header/header.component';
import { FooterComponent } from './theme/components/footer/footer.component';
import { SidebarComponent } from './theme/components/sidebar/sidebar.component';
import { VerticalMenuComponent } from './theme/components/menu/vertical-menu/vertical-menu.component';
import { HorizontalMenuComponent } from './theme/components/menu/horizontal-menu/horizontal-menu.component';
import { BreadcrumbComponent } from './theme/components/breadcrumb/breadcrumb.component';
import { BackTopComponent } from './theme/components/back-top/back-top.component';
import { UserMenuComponent } from './theme/components/user-menu/user-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TokenInterceptorService } from './services/token-interceptor.service';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { UserIdleModule } from 'angular-user-idle';
import { ToastrModule } from 'ngx-toastr';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { InputErrorMessagesComponent } from './@core/input-error-messages/input-error-messages.component';

import { PagesModule } from './pages/pages.module'
import { environment } from '../environments/environment';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


@NgModule({

  declarations: [
    AppComponent,
    NotFoundComponent,
    InputErrorMessagesComponent,


  ],
  imports: [
    BrowserModule,
    routing,
    PagesModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgHttpLoaderModule,
    UserIdleModule.forRoot({
      idle: environment.IDLE,
      timeout: environment.TIMEOUT,
      ping: environment.PING
    }),
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: environment.TOASTER_TIMEOUT,
      preventDuplicates: environment.PREVENT_DUPLICATES
    }),
  ],
  providers: [AppSettings,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {



}
