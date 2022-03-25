import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chart-select',
  templateUrl: './chart-select.component.html',
  styleUrls: ['./chart-select.component.scss']
})
export class ChartSelectComponent implements OnInit {

  types: any = {
    pie: 1,
    column: 2,
    bar: 3,
    line: 4
  };
  index: number = 0;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let type = this.route.snapshot.params['type'];
    this.index = parseInt(this.types[type]);
  }
}