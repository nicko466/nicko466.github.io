import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CovidapiService} from './services/covidapi.service';
import {Covid19RoutingModule} from './covid19-routing.module';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
    bootstrap: [DashboardComponent],
    declarations: [DashboardComponent],
    providers: [
        CovidapiService,
    ],
    imports: [
        MatExpansionModule,
        MatDividerModule,
        CommonModule,
        Covid19RoutingModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule,
        MatAutocompleteModule,
        MatInputModule,
        MatButtonModule,
        MatTabsModule,
    ]
})
export class Covid19Module {
}
