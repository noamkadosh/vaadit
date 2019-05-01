import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Tenant} from '../tenant.model';
import {PropertyService} from '../../properties/property.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TenantService} from '../tenant.service';
import {Property} from '../../properties/property.model';

@Component({
  selector: 'app-tenants-details-edit',
  templateUrl: './tenants-edit.component.html',
  styleUrls: ['./tenants-edit.component.scss']
})
export class TenantsEditComponent implements OnInit {
  // id of the property to edit (if on edit mode)
  id: number;
  editMode = false;
  tenantForm: FormGroup;
  propertyInput = new FormControl();
  // list of all tenants available
  private propertySuggestions: Property[];
  // filtered list of tenants to display at the tenants input
  suggestions: Property[] = [];

  constructor(
    private propertiesService: PropertyService,
    private route: ActivatedRoute,
    private router: Router,
    private tenantsService: TenantService
  ) { }

  ngOnInit() {
    this.propertySuggestions = this.propertiesService.getProperties();
    // checking according to the route what mode we're in
    this.editMode = this.router.url.indexOf('/edit') > -1;
    if (this.editMode) { // only edit mode needs the id
      this.id = this.tenantsService.getTenantIndexToEdit();
    }
    this.initForm();
  }

  /**
   * this function initializes the tenant form.
   */
  private initForm() {
    // new tenant mode
    // empty fields
    let tenantName = '';
    let tenantPhone = '';
    let propertyName = '';

    if (this.editMode) {
      // edit tenant mode
      // fetching the current tenant's data
      const tenant = this.tenantsService.getTenant(this.id);
      tenantName = tenant.getName();
      tenantPhone = tenant.getPhone();
      // this tenant's property
      if (tenant.getProperty() !== null) {
        this.tenantsService.propertyChosen = tenant.getProperty();
        propertyName = this.tenantsService.propertyChosen.getName();
        // the value you see at the property input is only the property's name
        this.propertyInput.setValue(propertyName);
      }
    }
    // initializing the form according to the relevant data
    this.tenantForm = new FormGroup({
      'name': new FormControl(tenantName, Validators.required),
      'phone': new FormControl(tenantPhone, Validators.required),
      'property': this.propertyInput
    });
  }

  /**
   * this function handles the submission if the property form.
   */
  onSubmit() {
    // Edit Mode
    if (this.editMode) {
      const oldTenant = this.tenantsService.getTenant(this.id);
      const newTenant = new Tenant(
        this.tenantForm.value['name'],
        this.tenantForm.value['phone']);
      if (this.tenantsService.propertyChosen !== null) {
        newTenant.setProperty(this.tenantsService.propertyChosen);
      }
      // checking if the old tenant had a property assigned
      if (oldTenant.getProperty() === null) {
        newTenant.getProperty().setTenant(newTenant);
        this.tenantsService.updateTenant(this.id, newTenant);
      } else {
        // checking if the old property is different then the new one
        if (oldTenant.getProperty() !== newTenant.getProperty()) {
          oldTenant.getProperty().removeTenant();
          // checking if the user entered any input
          if (this.propertyInput.value !== '') {
            newTenant.getProperty().setTenant(newTenant);
          }
        }
        // updating the tenant
        this.tenantsService.updateTenant(this.id, newTenant);
      }
      // New Mode
    } else {
      // creating the new tenant
      const newTenant = new Tenant(
        this.tenantForm.value['name'],
        this.tenantForm.value['phone']);
      // adding property if desired
      if (this.tenantsService.propertyChosen !== null) {
        newTenant.setProperty(this.tenantsService.propertyChosen);
        this.tenantsService.propertyChosen.setTenant(newTenant);
      }
      // adding the tenant to the data
      this.tenantsService.addTenant(newTenant);
    }
    // this call is only to navigate away from the page at submission.
    this.onCancel();
  }

  /**
   * this function handles the cancellation of the form simply by navigating back.
   */
  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  /**
   * this function shows the available tenants at the focus on the tenants input.
   */
  showProperties() {
    this.suggestions = this.propertySuggestions;
  }

  /**
   * this function filters and updates the suggestions of tenants at the tenants input.
   */
  suggestProperties() {
    this.suggestions = this.propertySuggestions
      .filter(property => property.getName().startsWith(this.propertyInput.value))
      .slice();
  }

  /**
   * this function handles the click on a tenant from the suggestion list.
   * @param property - the tenant that was chosen by the user.
   */
  addToInput(property: Property) {
    this.tenantsService.propertyChosen = property;
    this.propertyInput.setValue(property.getName());
    // empties the suggestion box.
    this.suggestions = [];
  }

  /**
   * this function removes the current tenant from the input
   */
  onRemoveProperty() {
    this.tenantsService.propertyChosen = null;
    this.propertyInput.setValue('');
    this.suggestions = [];
  }
}
