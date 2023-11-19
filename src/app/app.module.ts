import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { TablaSpComponent } from './components/tabla-sp/tabla-sp.component';
import { ChartComponent } from './components/chart/chart.component';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    TablaSpComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
