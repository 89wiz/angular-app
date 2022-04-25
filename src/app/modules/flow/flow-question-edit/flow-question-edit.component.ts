import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FlowQuestion } from '../flow-question/flow-question';

@Component({
  selector: 'app-flow-question-edit',
  templateUrl: './flow-question-edit.component.html',
  styleUrls: ['./flow-question-edit.component.scss']
})
export class FlowQuestionEditComponent implements OnInit {

  questionForm = this.formBuilder.group({
    question: ['', Validators.required],
    answer1: ['', Validators.required],
    answer2: ['', Validators.required],
    answer3: ['', Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<FlowQuestionEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FlowQuestion,
    private formBuilder: FormBuilder) { }

  ngOnInit() {      
    this.questionForm.get('question')?.setValue(this.data.question);
    this.questionForm.get('answer1')?.setValue(this.data.answers[0].answer);
    this.questionForm.get('answer2')?.setValue(this.data.answers[1].answer);
    this.questionForm.get('answer3')?.setValue(this.data.answers[2].answer);
  }

  save(){
    this.data.question = this.questionForm.get('question')?.value;
    this.data.answers[0].answer = this.questionForm.get('answer1')?.value;
    this.data.answers[1].answer = this.questionForm.get('answer2')?.value;
    this.data.answers[2].answer = this.questionForm.get('answer3')?.value;
    this.dialogRef.close(this.data);
  };
}