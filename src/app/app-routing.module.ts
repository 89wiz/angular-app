import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'google-charts',
    loadChildren: () => import('./modules/google-charts/google-charts.module').then(m => m.GoogleChartsModule)
  },
  {
    path: 'signalr',
    loadChildren: () => import('./modules/signalr/signalr.module').then(m => m.SignalRModule)
  },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
