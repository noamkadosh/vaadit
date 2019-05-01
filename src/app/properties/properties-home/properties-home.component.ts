import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PropertyService} from '../property.service';
import {Item} from '../../shared/donut-chart/donut/item.model';
import {Subscription} from 'rxjs';
import {DateService} from '../../shared/date.service';

@Component({
  selector: 'app-properties-home',
  templateUrl: './properties-home.component.html',
  styleUrls: ['./properties-home.component.scss']
})
export class PropertiesHomeComponent implements OnInit {
  vacancyPercentage: number = this.propertyService.getVacancyPercentage();
  vacancy: number = this.propertyService.getVacancy();
  items: Array<Item> = [
    { name: 'vacant', count: this.vacancy, color: '#F44336' },
    { name: 'occupied', count: this.propertyService.getProperties().length - this.vacancy, color: '#4CAF50' }
  ];
  // the subscription for changes in properties.
  propertiesSubscription: Subscription;
  date: string;

  constructor(
    private propertyService: PropertyService,
    private router: Router,
    private route: ActivatedRoute,
    private dateService: DateService
  ) { }

  ngOnInit() {
    // subscribing to changes in properties and changing the donut chart
    this.propertiesSubscription = this.propertyService.propertiesChanged
      .subscribe(
        () => {
          this.vacancy = this.propertyService.getVacancy();
          this.vacancyPercentage = this.propertyService.getVacancyPercentage();
          this.items = [
            { name: 'vacant', count: this.vacancy, color: 'red' },
            { name: 'occupied', count: this.propertyService.getProperties().length - this.vacancy, color: 'green' }
          ];
        }
      );
    this.date = this.dateService.getHebrewDateString();
  }

  /**
   * This function navigate to the add new property page.
   */
  onAddProperty() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
