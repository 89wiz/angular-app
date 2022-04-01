import { Component, OnInit } from '@angular/core';
import { FlowQuestion } from './flow-question/flow-question';

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss']
})
export class FlowComponent implements OnInit {

  questions: FlowQuestion[] = [];

  constructor() { }

  ngOnInit() {
  }

  addQuestion() {
    this.questions.push({
      id: this.questions.length + 1,
      position: { x: 0, y: 0 },
      question: 'New Question',
      answers: [
        { id: (this.questions.length + 1) * 100 + 1, answer: "New Answer 1", leadTo: undefined, position: { x: 0, y: 0 } },
        { id: (this.questions.length + 1) * 100 + 2, answer: "New Answer 2", leadTo: undefined, position: { x: 0, y: 0 } },
        { id: (this.questions.length + 1) * 100 + 3, answer: "New Answer 3", leadTo: undefined, position: { x: 0, y: 0 } },
      ]
    })
  }
}
