import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { GoogleChartsRoutingModule } from './google-charts.routing';
import { GoogleChartsModule as GoogleChartsWrapperModule } from 'angular-google-charts'
import { ChartSelectComponent } from './chart-select/chart-select.component';
import { ChartPieComponent } from './chart-pie/chart-pie.component';
import { ChartColumnComponent } from './chart-column/chart-column.component';
import { ChartBarComponent } from './chart-bar/chart-bar.component';
import { ChartLineComponent } from './chart-line/chart-line.component';
import { ChartOverviewComponent } from './chart-overview/chart-overview.component';

@NgModule({
  declarations: [
    ChartSelectComponent,
    ChartOverviewComponent,
    ChartPieComponent,
    ChartColumnComponent,
    ChartBarComponent,
    ChartLineComponent
  ],
  imports: [
    SharedModule,
    GoogleChartsRoutingModule,
    GoogleChartsWrapperModule
  ]
})
export class GoogleChartsModule { }
