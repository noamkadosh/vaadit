import { Component, Input } from '@angular/core';
import {Item} from './item.model';
@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.scss']
})
export class DonutComponent {
  @Input() items: Array<Item> = [
    { name: 'vacant', count: 10, color: 'green' },
    { name: 'occupied', count: 1, color: 'red' }
  ];
  @Input() radius = 100;
  @Input() width = 36;
  @Input() centerText: {name: string, value: string};
  @Input() fontColor = 'black';
  @Input() fontSize = 16;
  @Input() symbol: string;

  constructor() {}

  getPerimeter() {
    return Math.PI * 2 * this.radius;
  }

  getTotal() {
    return this.items.map(a => a.count).
    reduce((x, y) => x + y);
  }

  getCenter() {
    return this.radius + (this.width / 2);
  }

  getViewBox() {
    return '0 0 ' + (this.getCenter() * 2).toString() + ' ' + (this.getCenter() * 2).toString();
  }

  getOffset(index: number): number {
    const percent: number = index === 0 ? index : this.items.slice(0, index)
      .map(a => a.count).
    reduce((x, y) => x + y);
    return this.getPerimeter() * percent / this.getTotal();
  }
}
