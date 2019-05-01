import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Property} from '../../properties/property.model';
import {MaintenanceService} from '../maintenance.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PropertyService} from '../../properties/property.service';
import {MaintenanceIssue} from '../maintenance-issue.model';

@Component({
  selector: 'app-maintenance-edit',
  templateUrl: './maintenance-edit.component.html',
  styleUrls: ['./maintenance-edit.component.scss']
})
export class MaintenanceEditComponent implements OnInit {
  id: number;
  editMode = false;
  maintenanceForm: FormGroup;
  propertyInput = new FormControl();
  private propertySuggestions: Property[];
  suggestions: Property[] = [];

  constructor(
    private maintenanceService: MaintenanceService,
    private router: Router,
    private route: ActivatedRoute,
    private propertyService: PropertyService
  ) {
  }

  ngOnInit() {
    this.propertySuggestions = this.propertyService.getProperties();
    this.editMode = this.router.url.indexOf('/edit') > -1;
    if (this.editMode) {
      this.id = this.maintenanceService.getIssueIndexToEdit();
    }
    this.initForm();
  }

  /**
   * this function issue's the property form.
   */
  private initForm() {
    // new issue mode
    // empty fields
    let issueDesc = '';
    let company = '';
    let issueCost: number = null;
    let issueProperty: Property = null;

    if (this.editMode) {
      // edit issue mode
      // fetching the current property's data
      const issue = this.maintenanceService.getIssue(this.id);
      issueDesc = issue.issue;
      company = issue.getWorkingCompany();
      issueCost = issue.getCost();
      // this issue's property
      issueProperty = issue.getProperty();
      this.maintenanceService.propertyChosen = issueProperty;
      this.propertyInput.setValue(issueProperty.getName());
    }
    // initializing the form according to the relevant data
    this.maintenanceForm = new FormGroup({
      'description': new FormControl(issueDesc, Validators.required),
      'company': new FormControl(company, Validators.required),
      'cost': new FormControl(issueCost, [
        Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
      ]),
      // the initialization of the property's Form Control is at the global variable
      'property': this.propertyInput
    });
  }

  /**
   * this function handles the submission if the issue's form.
   */
  onSubmit() {
    // Edit Mode
    if (this.editMode) {
      const newIssue = new MaintenanceIssue(
        this.maintenanceForm.value['description'],
        this.maintenanceService.propertyChosen,
        this.maintenanceForm.value['cost']);
      newIssue.setWorkingCompany(this.maintenanceForm.value['company']);
      this.maintenanceService.updateIssue(this.id, newIssue);
      // New Mode
    } else {
      // creating the new property
      const newIssue = new MaintenanceIssue(
        this.maintenanceForm.value['description'],
        this.maintenanceService.propertyChosen,
        this.maintenanceForm.value['cost']);
      newIssue.setWorkingCompany(this.maintenanceForm.value['company']);
      // adding the property to the data
      this.maintenanceService.addIssue(newIssue);
    }
    // this call is only to navigate away from the page at submission.
    this.onCancel();
  }

  /**
   * this function cancels the form simply by navigating back
   */
  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  /**
   * this function shows the available properties at the focus on the properties input.
   */
  suggestProperties() {
    this.suggestions = this.propertySuggestions
      .filter(property => property.getName().startsWith(this.propertyInput.value))
      .slice();
  }

  /**
   * this function filters and updates the suggestions of properties at the property input.
   */
  showProperties() {
    this.suggestions = this.propertySuggestions;
  }

  /**
   * this function handles the click on a property from the suggestion list.
   * @param property - the property that was chosen by the user.
   */
  addToInput(property: Property) {
    this.maintenanceService.propertyChosen = property;
    this.propertyInput.setValue(property.getName());
    // empties the suggestion box.
    this.suggestions = [];
  }

  /**
   * this function removes the current property from the input
   */
  onRemoveProperty() {
    this.maintenanceService.propertyChosen = null;
    this.propertyInput.setValue('');
    this.suggestions = [];
  }
}
