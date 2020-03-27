import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {CovidapiService} from './services/covidapi.service';
import {Covid19RoutingModule} from './covid19-routing.module';

@NgModule({
  bootstrap: [DashboardComponent],
  declarations: [DashboardComponent],
  providers: [
      CovidapiService,
  ],
  imports: [
    CommonModule,
      Covid19RoutingModule,

  ]
})
export class Covid19Module { }
