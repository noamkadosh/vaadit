import {Component, OnInit} from '@angular/core';
import {Item} from '../../shared/donut-chart/donut/item.model';
import {PropertyService} from '../../properties/property.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {TenantService} from '../tenant.service';
import {DateService} from '../../shared/date.service';

@Component({
  selector: 'app-tenants-home',
  templateUrl: './tenants-home.component.html',
  styleUrls: ['./tenants-home.component.scss']
})
export class TenantsHomeComponent implements OnInit {
  vacancy = this.getVacancyNumber();
  items: Array<Item> = [
    {name: 'vacant', count: this.vacancy, color: '#F44336'},
    {name: 'occupied', count: this.propertyService.getProperties().length - this.vacancy, color: '#4CAF50'}
  ];
  private tenantsSubscription: Subscription;
  occupiedPropertyValue = this.getOccupiedNumber();
  date: string;

  constructor(private tenantsService: TenantService,
              private propertyService: PropertyService,
              private router: Router,
              private route: ActivatedRoute,
              private dateService: DateService) {
  }

  ngOnInit() {
    // subscribing to changes in tenants and changing the donut chart
    this.tenantsSubscription = this.tenantsService.tenantsChanged
      .subscribe(
        () => {
          this.occupiedPropertyValue = this.getOccupiedNumber();
          this.vacancy = this.getVacancyNumber();
          this.items = [
            {name: 'vacant', count: this.vacancy, color: 'red'},
            {name: 'occupied', count: this.propertyService.getProperties().length - this.vacancy, color: 'green'}
          ];
        }
      );
    this.date = this.dateService.getHebrewDateString();
  }

  /**
   * this function is using the property service to return the number of vacant properties
   */
  getVacancyNumber() {
    return this.propertyService.getVacancy();
  }

  /**
   * this function is using the property service to return the number of occupied properties
   */
  getOccupiedNumber() {
    return this.propertyService.getOccupied();
  }

  /**
   * this function navigates to the add new tenant page
   */
  onAddTenant() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
