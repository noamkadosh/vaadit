import {Component, Input, OnInit} from '@angular/core';
import {Item} from './donut/item.model';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnInit {
  @Input() values: string[];
  @Input() centerText: {name: string, value: string};
  @Input() items: Array<Item>;
  @Input() symbol: string;

  constructor() { }

  ngOnInit() {
  }

  getColorsArray() {
    const colors: string[] = new Array(this.items.length);
    let i = 0;
    for (const item of this.items) {
      colors[i] = item.color;
      i++;
    }
    return colors;
  }
}
