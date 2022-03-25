import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignalRComponent } from './signalr/signalr.component';

const routes: Routes = [
  {
    path: '',
    component: SignalRComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignalRRoutingModule { }
