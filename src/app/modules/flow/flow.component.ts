import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { FlowQuestionEditComponent } from './flow-question-edit/flow-question-edit.component';
import { FlowQuestion, FlowQuestionAnswer } from './flow-question/flow-question';

import 'leader-line';
declare let LeaderLine: any;

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss']
})
export class FlowComponent implements OnInit {

  questions: FlowQuestion[] = [];
  cursorPosition: { x: number, y: number } = { x: 0, y: 0 };
  showCursor: boolean = false;

  linking: { question: FlowQuestion | undefined, answer: FlowQuestionAnswer | undefined } = { question: undefined, answer: undefined };

  links: { question: FlowQuestion, answer: FlowQuestionAnswer, leaderLine: any }[] = [];

  private static readonly localStorageKey: string = "flow-questions";

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  addQuestion() {
    this.questions.push({
      id: this.questions.length + 1,
      position: { x: 0, y: 0 },
      question: 'New Question',
      answers: [
        { id: (this.questions.length + 1) * 100 + 1, answer: "New Answer 1", leadTo: undefined, position: { x: 0, y: 0 }, dragging: false },
        { id: (this.questions.length + 1) * 100 + 2, answer: "New Answer 2", leadTo: undefined, position: { x: 0, y: 0 }, dragging: false },
        { id: (this.questions.length + 1) * 100 + 3, answer: "New Answer 3", leadTo: undefined, position: { x: 0, y: 0 }, dragging: false },
      ]
    })
  }

  edit(question: FlowQuestion) {
    var dialog = this.dialog.open(FlowQuestionEditComponent, {
      data: question
    });
    dialog.afterClosed().subscribe(result => {
      if (!result) return;

      this.questions[this.questions.indexOf(question)] = { ...result };
    });
  }

  delete(question: FlowQuestion) {
    var dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete',
        message: `You confirm deleting question id ${question.id}?`
      }
    });

    dialog.afterClosed().subscribe(result => {
      if (!result) return;

      this.questions.splice(this.questions.indexOf(question), 1);
    });
  }

  linkQuestion(question: FlowQuestion) {
    this.linking.question = question;
    this.addLink(this.linking);
  }

  linkAnswer(answer: FlowQuestionAnswer) {
    this.linking.answer = answer;
    this.addLink(this.linking);
  }

  addLink(link: { question: FlowQuestion | undefined, answer: FlowQuestionAnswer | undefined }) {
    if (!link.question || !link.answer)
      return;

    link.answer.leadTo = link.question.id;
    this.createLeadLine(link.question, link.answer, this.links);
    this.linking = { question: undefined, answer: undefined };
  }

  createLeadLine(question: FlowQuestion, answer: FlowQuestionAnswer, links: { question: FlowQuestion, answer: FlowQuestionAnswer, leaderLine: any }[]) {
    let leaderLine = new LeaderLine(document.getElementById(`answer-${answer.id}`), document.getElementById(`question-${question.id}`));
    links.push({ question: question, answer: answer, leaderLine: leaderLine });
  }

  unlinkAnswer(answer: FlowQuestionAnswer) {
    let index = this.links.findIndex(x => x.answer == answer);
    if (index < 0)
      return;

    this.links[index].leaderLine.remove();
    this.links[index].answer.leadTo = undefined;
    this.links.splice(index, 1);
  }

  updatePosition(question: FlowQuestion) {
    let updateLinks = this.links.filter(x => x.question == question || question.answers.indexOf(x.answer) >= 0);
    for (let link of updateLinks)
      link.leaderLine.position();
  }

  save() {
    localStorage.setItem(FlowComponent.localStorageKey, JSON.stringify(this.questions));
  }

  load() {
    for (let link of this.links)
      link.leaderLine.remove();
    this.links = [];
    this.questions = JSON.parse(localStorage.getItem(FlowComponent.localStorageKey) || '');

    let questions = this.questions;
    let createLeadLine = this.createLeadLine;
    let links = this.links;

    setTimeout(function () {
      for (let question of questions) {
        for (let answer of question.answers) {
          if (!answer.leadTo) continue;

          let q = questions.find(x => x.id == answer.leadTo);

          if (q) createLeadLine(q, answer, links);
        }
      }
    }, 250);
  }

  @HostListener('mousemove', ['$event'])
  mouseMove($event: MouseEvent) {
    // const topLeft = $event.clientX < window.innerWidth / 2 &&
    //                 $event.clientY < window.innerHeight / 2;
    // const topRight = $event.clientX > window.innerWidth / 2 &&
    //                 $event.clientY < window.innerHeight / 2;
    // const bottomLeft = $event.clientX < window.innerWidth / 2 &&
    //                 $event.clientY > window.innerHeight / 2;
    // const bottomRight = $event.clientX > window.innerWidth / 2 &&
    //                 $event.clientY > window.innerHeight / 2;
  }

  updateCursor(param: any) {

  }
}
