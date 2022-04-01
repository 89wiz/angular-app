import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlowComponent } from './flow.component';
import { FlowRoutingModule } from './flow.routing';
import { FlowQuestionComponent } from './flow-question/flow-question.component';

@NgModule({
  imports: [
    SharedModule,
    DragDropModule,
    FlowRoutingModule
  ],
  declarations: [
    FlowComponent,
    FlowQuestionComponent
  ]
})
export class FlowModule { }
