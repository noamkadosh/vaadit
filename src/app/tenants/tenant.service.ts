import { Injectable } from '@angular/core';
import {Tenant} from './tenant.model';
import {Property} from '../properties/property.model';
import {Subject} from 'rxjs';

@Injectable()
export class TenantService {
  // subject that is responsible for changes in tenants
  tenantsChanged = new Subject<Tenant[]>();
  propertyChosen: Property;
  private tenantIndexToEdit: number;
  private tenants: Tenant[] = [
    new Tenant(
      'נעם קדוש', '054-3067755'
    ),
    new Tenant(
      'אלי קדוש', '054-2643888'
    ),
    new Tenant(
      'טוני קדוש', '054-2643888'
    ),
    new Tenant(
      'מאיה קדוש', '054-3067755'
    )
  ];

  constructor() {}

  /**
   * this function returns the tenants list.
   */
  getTenants() {
    return this.tenants;
  }

  getTenant(index: number) {
    return this.tenants[index];
  }

  /**
   * this function adds a tenant to the tenants array.
   * @param tenant - the property to add.
   */
  addTenant(tenant: Tenant) {
    this.tenants.push(tenant);
    this.tenantsChanged.next(this.tenants.slice());
  }

  /**
   * this function updates a tenant in the tenants array.
   * @param index - index of the tenant to be edited.
   * @param newTenant - the new edited tenant to be added.
   */
  updateTenant(index: number, newTenant: Tenant) {
    this.tenants[index] = newTenant;
    this.tenantsChanged.next(this.tenants.slice());
  }

  /**
   * this function returns the index of the tenant to be edited.
   */
  getTenantIndexToEdit() {
    return this.tenantIndexToEdit;
  }

  /**
   * this function sets the index of the tenant to be edited.
   * @param index - index of the tenant to be edited.
   */
  setTenantIndexToEdit(index: number) {
    this.tenantIndexToEdit = index;
  }

  /**
   * this function deletes a tenant from the tenants array.
   * @param index - the index of the tenant to be deleted in the tenants array.
   */
  deleteTenant(index: number) {
    this.tenants.splice(index, 1);
    this.tenantsChanged.next(this.tenants.slice());
  }
}
