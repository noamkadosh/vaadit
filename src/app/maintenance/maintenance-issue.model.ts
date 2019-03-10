import {Property} from '../properties/property.model';

export class MaintenanceIssue {
  readonly issue: string;
  private property: Property;
  private workingCompany: string;
  private cost: number;
  private isCompleted = false;

  constructor(issue: string, property: Property, cost: number) {
    this.issue = issue;
    this.property = property;
    this.cost = cost;
  }

  /**
   * this function returns the issue
   */
  getIssue() {
    return this.issue;
  }

  /**
   * this function returns the property suffering the issue
   */
  getProperty() {
    return this.property;
  }

  /**
   * this function sets the property suffering from the issue
   * @param property - the property suffering the issue
   */
  setProperty(property: Property) {
    this.property = property;
  }

  /**
   * this function returns the company hired to work on the issue
   */
  getWorkingCompany() {
    return this.workingCompany;
  }

  /**
   * this function sets the company hired to work on the issue
   * @param workingCompany - the company hired
   */
  setWorkingCompany(workingCompany: string) {
    this.workingCompany = workingCompany;
  }

  /**
   * this function returns the cost of the issue
   */
  getCost() {
    return this.cost;
  }

  /**
   * this function sets the cost of the issue
   * @param cost - the cost to repair the issue
   */
  setCost(cost: number) {
    this.cost = cost;
  }

  /**
   * this function returns this issue's situation - true for closed false for open
   */
  getSituation() {
    return this.isCompleted;
  }

  /**
   * this function sets this issue as closed
   */
  close() {
    this.isCompleted = true;
  }

  /**
   * this function opens the issue
   */
  open() {
    this.isCompleted = false;
  }
}
