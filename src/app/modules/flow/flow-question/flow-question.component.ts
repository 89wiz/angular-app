import { CDK_DRAG_CONFIG } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { FlowQuestion, FlowQuestionPosition } from './flow-question';

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
  question: FlowQuestion | undefined

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
      event.source.element.nativeElement.parentElement.parentElement.style.zIndex = 10000;
  }

  reset(event: any) {
    event.source.element.nativeElement.style.zIndex = 1000;
    event.source.element.nativeElement.parentElement.style.zIndex = 1000;
    event.source.element.nativeElement.parentElement.parentElement.style.zIndex = 1000;
    event.source.reset();
  }

  savePosition(event: any, question: FlowQuestion | undefined) {
    event.source.element.nativeElement.style.zIndex = 1000;
    event.source.element.nativeElement.parentElement.style.zIndex = 1000;
    let element = event.source.getRootElement();
    let boundingClientRect = element.getBoundingClientRect();
    let parentPosition = this.getPosition(element);
    if (question)
      question.position = { x: boundingClientRect.x - parentPosition.left, y: boundingClientRect.y - parentPosition.top };
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
}
