import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlowComponent } from './flow.component';
import { FlowRoutingModule } from './flow.routing';
import { FlowQuestionComponent } from './flow-question/flow-question.component';
import { FlowQuestionEditComponent } from './flow-question-edit/flow-question-edit.component';

@NgModule({
  imports: [
    SharedModule,
    DragDropModule,
    FlowRoutingModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [
    FlowComponent,
    FlowQuestionComponent,
    FlowQuestionEditComponent
  ]
})
export class FlowModule { }
