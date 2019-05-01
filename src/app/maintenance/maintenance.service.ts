import { Injectable } from '@angular/core';
import {MaintenanceIssue} from './maintenance-issue.model';
import {PropertyService} from '../properties/property.service';
import {Subject} from 'rxjs';
import {Property} from '../properties/property.model';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  issuesChanged = new Subject<MaintenanceIssue[]>();
  propertyChosen: Property;
  private issues: MaintenanceIssue[] = [
    new MaintenanceIssue(
      'צנרת',
      this.pService.getProperty(0),
      500
    )
  ];
  private issueIndexToEdit: number;

  constructor(private pService: PropertyService) { }

  /**
   * this function returns the issues array
   */
  getIssues() {
    return this.issues;
  }

  /**
   * this function returns the issue at the given index
   * @param index - the issue to return's index
   */
  getIssue(index: number) {
    return this.issues[index];
  }

  /**
   * this function returns the index of the issue to be edited.
   */
  getPropertyIndexToEdit() {
    return this.issueIndexToEdit;
  }

  /**
   * this function sets the index of the issue to be edited.
   * @param index - index of the issue to be edited.
   */
  setPropertyIndexToEdit(index: number) {
    this.issueIndexToEdit = index;
  }

  /**
   * this function deletes the issue at the given index
   * @param index - the index of the issue to delete
   */
  deleteIssue(index: number) {
    this.issues.splice(index, 1);
    this.issuesChanged.next(this.issues.slice());
  }

  /**
   * this function opens an issue at the given index
   * @param index - the index of the issue to be opened
   */
  openIssue(index: number) {
    if (this.issues[index].getSituation()) {
      this.issues[index].open();
      this.issuesChanged.next(this.issues.slice());
    }
  }

  /**
   * this function closes an issue at the given index
   * @param index - the index of the issue to be closed
   */
  closeIssue(index: number) {
    if (!this.issues[index].getSituation()) {
      this.issues[index].close();
      this.issuesChanged.next(this.issues.slice());
    }
  }

  /**
   * this function returns the number of open issues
   */
  getOpenIssuesValue() {
    let openIssuesNumber = 0;
    this.issues.forEach(issue => {
      if (!issue.getSituation()) {
        openIssuesNumber++;
      }
    });
    return openIssuesNumber;
  }

  /**
   * this function returns the index of the issue to be edited
   */
  getIssueIndexToEdit() {
    return this.issueIndexToEdit;
  }

  /**
   * this function adds a new issue to the issues array
   * @param issue - the issue to be added
   */
  addIssue(issue: MaintenanceIssue) {
    this.issues.push(issue);
    this.issuesChanged.next(this.issues.slice());
  }

  /**
   * this function updates an issue on the issues array
   * @param index - the index of the issue to be updated
   * @param issue - the new data of the issue
   */
  updateIssue(index: number, issue: MaintenanceIssue) {
    this.issues[index] = issue;
    this.issuesChanged.next(this.issues.slice());
  }
}
