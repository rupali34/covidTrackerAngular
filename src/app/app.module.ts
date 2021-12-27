import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { ChartComponent } from './chart/chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Matrial import
import { MatCardModule } from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { CountrySelectorComponent } from './country-selector/country-selector.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GlobalErrorHandlerService } from './shared/global-error-handler.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalHttpInterceptorService } from './shared/global-http-interceptor.service';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'primeng/chart';
import { ErrormessageComponent } from './errormessage/errormessage.component';
import { NgxSpinnerModule } from "ngx-spinner";
import {MatDialogModule} from '@angular/material/dialog';
import {ToastModule} from 'primeng/toast';

// import {DynamicDialogModule} from 'primeng/dynamicdialog';
// import {DialogModule} from 'primeng/dialog';
const importArray = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  MatCardModule,
  MatFormFieldModule,
  FormsModule,
  MatInputModule,
  MatNativeDateModule,
  HttpClientModule,
  ChartModule,
  NgxSpinnerModule,
  MatDialogModule,
  ToastModule
];
@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    ChartComponent,
    CountrySelectorComponent,
    ErrormessageComponent,
  ],
  imports: [ ...importArray, MatSelectModule, BrowserAnimationsModule],
  providers: [Title,
    {provide:HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true},
    {provide:ErrorHandler, useClass:GlobalErrorHandlerService}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
