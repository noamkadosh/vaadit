import { Component, OnInit } from '@angular/core';
import {MaintenanceIssue} from '../maintenance-issue.model';
import {MaintenanceService} from '../maintenance.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-maintenance-list',
  templateUrl: './maintenance-list.component.html',
  styleUrls: ['./maintenance-list.component.scss']
})
export class MaintenanceListComponent implements OnInit {
  issues: MaintenanceIssue[];
  maintenanceSubscription: Subscription;

  constructor(private maintenanceService: MaintenanceService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // subscribing to changes in properties and changing the list
    this.maintenanceSubscription = this.maintenanceService.issuesChanged
      .subscribe(
        (issues: MaintenanceIssue[]) => {
          this.issues = issues;
        }
      );
    this.issues = this.maintenanceService.getIssues();
  }

  onCompleteIssue(index: number) {
    this.maintenanceService.closeIssue(index);
  }

  onOpenIssue(index: number) {
    this.maintenanceService.openIssue(index);
  }

  onEditIssue(index: number) {
    this.maintenanceService.setPropertyIndexToEdit(index);
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteIssue(index: number) {
    this.maintenanceService.deleteIssue(index);
  }
}
