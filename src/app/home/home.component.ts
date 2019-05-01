import { Component, OnInit } from '@angular/core';
import {Item} from '../shared/donut-chart/donut/item.model';
import {PropertyService} from '../properties/property.service';
import {DateService} from '../shared/date.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  paidValue = String(this.propertyService.getPaidPropertiesValue());
  items: Array<Item> = [
    { name: 'paid', count: +this.paidValue, color: '#4CAF50' },
    { name: 'due', count: this.propertyService.getDuePropertiesValue(), color: '#F44336' },
    { name: 'vacant', count: this.propertyService.getVacantPropertiesValue(), color: '#2196F3' }
  ];
  date: string;

  constructor(private propertyService: PropertyService,
              private dateService: DateService) { }

  ngOnInit() {
    this.date = this.dateService.getHebrewDateString();
  }
}
