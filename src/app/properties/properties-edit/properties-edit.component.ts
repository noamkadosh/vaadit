import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PropertyService} from '../property.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Property} from '../property.model';
import {TenantService} from '../../tenants/tenant.service';
import {Tenant} from '../../tenants/tenant.model';

@Component({
  selector: 'app-properties-edit',
  templateUrl: './properties-edit.component.html',
  styleUrls: ['./properties-edit.component.scss']
})
export class PropertiesEditComponent implements OnInit {
  // id of the property to edit (if on edit mode)
  id: number;
  editMode = false;
  propertyForm: FormGroup;
  tenantInput = new FormControl();

  constructor(
    private propertiesService: PropertyService,
    private route: ActivatedRoute,
    private router: Router,
    private tenantsService: TenantService
  ) {
  }

  ngOnInit() {
    // checking according to the route what mode we're in
    this.editMode = this.router.url.indexOf('/edit') > -1;
    if (this.editMode) { // only edit mode needs the id
      this.id = this.propertiesService.getPropertyIndexToEdit();
    }
    this.initForm();
  }

  /**
   * this function initializes the property form.
   */
  private initForm() {
    // new property mode
    // empty fields
    let propertyName = '';
    let propertyAddress = '';
    let propertyRent: number = null;
    let tenantName: string = null;

    if (this.editMode) {
      // edit property mode
      // fetching the current property's data
      const property = this.propertiesService.getProperty(this.id);
      propertyName = property.getName();
      propertyAddress = property.getAddress();
      propertyRent = property.getRent();
      // this property's tenant
      if (property.occupied) {
        this.propertiesService.tenantChosen = property.getTenant();
        tenantName = this.propertiesService.tenantChosen.getName();
        // the value you see at the tenant input is only the tenant's name
        this.tenantInput.setValue(tenantName);
      }
    }
    // initializing the form according to the relevant data
    this.propertyForm = new FormGroup({
      'name': new FormControl(propertyName, Validators.required),
      'address': new FormControl(propertyAddress, Validators.required),
      'rent': new FormControl(propertyRent, [
        Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
      ]),
      // the initialization of the tenant's Form Control is at the global variable
      'tenant': this.tenantInput
    });
  }

  /**
   * this function handles the submission if the property form.
   */
  onSubmit() {
    // Edit Mode
    if (this.editMode) {
      const oldProperty = this.propertiesService.getProperty(this.id);
      const newProperty = new Property(
        this.propertyForm.value['name'],
        this.propertyForm.value['address'],
        this.propertyForm.value['rent']);
      if (this.propertiesService.tenantChosen !== null) {
        newProperty.setTenant(this.propertiesService.tenantChosen);
      }
      // checking if the old property had a tenant residing in it
      if (oldProperty.getTenant() === null) {
        newProperty.getTenant().setProperty(newProperty);
        this.propertiesService.updateProperty(this.id, newProperty);
      } else {
        // checking if the old tenant is different then the new one
        if (oldProperty.getTenant() !== newProperty.getTenant()) {
          oldProperty.getTenant().removeProperty();
          // checking if the user entered any input
          if (this.tenantInput.value !== '') {
            newProperty.getTenant().setProperty(newProperty);
          }
        }
        // updating the property
        this.propertiesService.updateProperty(this.id, newProperty);
      }
      // New Mode
    } else {
      // creating the new property
      const newProperty = new Property(
        this.propertyForm.value['name'],
        this.propertyForm.value['address'],
        this.propertyForm.value['rent']);
      // adding tenant if desired
      if (this.propertiesService.tenantChosen !== null) {
        newProperty.setTenant(this.propertiesService.tenantChosen);
        this.propertiesService.tenantChosen.setProperty(newProperty);
      }
      // adding the property to the data
      this.propertiesService.addProperty(newProperty);
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

  addToInput(tenant: Tenant) {
    this.propertiesService.tenantChosen = tenant;
  }

  onRemoveTenant() {
    this.propertiesService.tenantChosen = null;
    this.tenantInput.setValue('');
  }
}
