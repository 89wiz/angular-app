import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SignalRRoutingModule } from './signalr.routing';
import { FinalizarJogadaComponent, SignalRComponent } from './signalr/signalr.component';

@NgModule({
  declarations: [
    SignalRComponent,
    FinalizarJogadaComponent
  ],
  imports: [
    SharedModule,
    SignalRRoutingModule
  ]
})
export class SignalRModule { }
