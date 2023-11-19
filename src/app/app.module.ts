import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { TablaSpComponent } from './components/tabla-sp/tabla-sp.component';
import { ChartComponent } from './components/chart/chart.component';

@NgModule({
    declarations: [AppComponent, TablaSpComponent, ChartComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatInputModule,
        MatTableModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatFormFieldModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
