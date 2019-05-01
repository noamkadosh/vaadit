import { Component, OnInit } from '@angular/core';
import {Item} from '../../shared/donut-chart/donut/item.model';
import {MaintenanceService} from '../maintenance.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {DateService} from '../../shared/date.service';

@Component({
  selector: 'app-maintenance-home',
  templateUrl: './maintenance-home.component.html',
  styleUrls: ['./maintenance-home.component.scss']
})
export class MaintenanceHomeComponent implements OnInit {
  private issuesSubscription: Subscription;
  private openIssuesNumber: number = this.maintenanceService.getOpenIssuesValue();
  items: Array<Item> = [
    { name: 'open', count: this.openIssuesNumber, color: '#F44336' },
    { name: 'closed', count: this.maintenanceService.getIssues().length - this.openIssuesNumber, color: '#4CAF50' }
  ];
  date: string;

  constructor(private maintenanceService: MaintenanceService,
              private router: Router,
              private route: ActivatedRoute,
              private dateService: DateService) { }

  ngOnInit() {
    // subscribing to changes in tenants and changing the donut chart
    this.issuesSubscription = this.maintenanceService.issuesChanged
      .subscribe(
        () => {
          this.openIssuesNumber = this.maintenanceService.getOpenIssuesValue();
          this.items = [
            { name: 'open', count: this.openIssuesNumber, color: 'red' },
            { name: 'closed', count: this.maintenanceService.getIssues().length - this.openIssuesNumber, color: 'green' }
          ];
        }
      );
    this.date = this.dateService.getHebrewDateString();
  }

  /**
   * this function navigates to the add issue page
   */
  onAddIssue() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
