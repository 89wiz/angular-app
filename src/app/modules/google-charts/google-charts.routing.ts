import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartBarComponent } from './chart-bar/chart-bar.component';
import { ChartColumnComponent } from './chart-column/chart-column.component';
import { ChartLineComponent } from './chart-line/chart-line.component';
import { ChartOverviewComponent } from './chart-overview/chart-overview.component';
import { ChartPieComponent } from './chart-pie/chart-pie.component';
import { ChartSelectComponent } from './chart-select/chart-select.component';

const routes: Routes = [
  {
    path: '',
    component: ChartSelectComponent,
    children: [
      { path: '', component: ChartOverviewComponent },
      { path: 'pie', component: ChartPieComponent },
      { path: 'column', component: ChartColumnComponent },
      { path: 'bar', component: ChartBarComponent },
      { path: 'line', component: ChartLineComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoogleChartsRoutingModule { }
