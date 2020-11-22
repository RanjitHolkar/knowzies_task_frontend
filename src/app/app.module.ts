import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor} from './_helpers/jwt.intrceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ng6-toastr-notifications';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AppBreadcrumbModule } from '@coreui/angular';
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    AppBreadcrumbModule.forRoot(),
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    ToastrModule,
    NgxSpinnerModule,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
