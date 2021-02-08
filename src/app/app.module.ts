import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CnnService} from './services/cnn.service';

import { AppComponent } from './app.component';
import { CrudComponent } from './components/crud/crud.component';
import { HttpClientModule} from '@angular/common/http';
import {PrimengModule} from './primeng/primeng.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    CrudComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    BrowserAnimationsModule
  ],
  providers: [CnnService],
  bootstrap: [AppComponent]
})
export class AppModule { }
