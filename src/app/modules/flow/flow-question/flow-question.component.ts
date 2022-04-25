import { CdkDragDrop, CDK_DRAG_CONFIG, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FlowQuestion, FlowQuestionAnswer, FlowQuestionPosition } from './flow-question';

const DragConfig = {
  dragStartThreshold: 0,
  pointerDirectionChangeThreshold: 5,
  zIndex: 10000
};
@Component({
  selector: 'app-flow-question',
  templateUrl: './flow-question.component.html',
  styleUrls: ['./flow-question.component.scss'],
  providers: [{ provide: CDK_DRAG_CONFIG, useValue: DragConfig }]
})
export class FlowQuestionComponent implements OnInit {

  @Input()
  question: FlowQuestion = { id: 0, question: '', answers: [], position: { x: 0, y: 0 } };

  @Output()
  onLinkQuestion = new EventEmitter<any>();
  
  @Output()
  onLinkAnswer = new EventEmitter<any>();

  @Output()
  onUnlinkAnswer = new EventEmitter<any>();

  @Output()
  onUpdatePosition = new EventEmitter<any>();

  @Output()
  onEdit = new EventEmitter<any>();

  @Output()
  onDelete = new EventEmitter<any>();

  get position() {
    return this.question ? this.question.position : this.defaultPosition;
  }
  defaultPosition: FlowQuestionPosition = { x: 0, y: 0 };

  constructor() { }

  ngOnInit() { }

  dragStart(event: any, isChild = false) {
    event.source.element.nativeElement.style.zIndex = 10000;
    event.source.element.nativeElement.parentElement.style.zIndex = 10000;
    if (isChild)
      event.source.element.nativeElement.parentElement.parentElement.parentElement.style.zIndex = 10000;
  }

  reset(event: any) {
    event.source.element.nativeElement.style.zIndex = 1000;
    event.source.element.nativeElement.parentElement.style.zIndex = 1000;
    event.source.element.nativeElement.parentElement.parentElement.parentElement.style.zIndex = 1000;
    event.source.reset();
  }

  dragLinkStart(event: any, answer: FlowQuestionAnswer, isChild = false) {
    answer.dragging = true;
    this.dragStart(event, isChild);
  }

  dragLinkEnd(event: any, answer: FlowQuestionAnswer) {
    answer.dragging = false;
    this.reset(event);
  }

  savePosition(event: any, question: FlowQuestion | undefined) {
    event.source.element.nativeElement.style.zIndex = 1000;
    event.source.element.nativeElement.parentElement.style.zIndex = 1000;
    let element = event.source.getRootElement();
    let boundingClientRect = element.getBoundingClientRect();
    let parentPosition = this.getPosition(element);
    if (question)
      question.position = { x: boundingClientRect.x - parentPosition.left, y: boundingClientRect.y - parentPosition.top };
    this.onUpdatePosition.emit(question);
  }

  getPosition(el: any) {
    let x = 0;
    let y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return { top: y, left: x };
  }

  linkQuestion(question: FlowQuestion) {
    this.onLinkQuestion.emit(question);
  }

  linkAnswer(answer: FlowQuestionAnswer) {
    this.onLinkAnswer.emit(answer);
  }

  unlinkAnswer(answer: FlowQuestionAnswer) {
    this.onUnlinkAnswer.emit(answer);
  }

  edit(question: FlowQuestion) {
    this.onEdit.emit(question);
  }

  delete(question: FlowQuestion) {
    this.onDelete.emit(question);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
