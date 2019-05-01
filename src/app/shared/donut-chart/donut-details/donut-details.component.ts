import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-donut-details',
  templateUrl: './donut-details.component.html',
  styleUrls: ['./donut-details.component.scss']
})
export class DonutDetailsComponent implements OnInit {
  @Input() values: string[];
  @Input() colors: string[];

  constructor() { }

  ngOnInit() {
  }

}
