import {Tenant} from '../tenants/tenant.model';

export class Property {
  private name: string;
  readonly address: string;
  private rent: number;
  private tenant: Tenant = null;
  occupied = false;
  private paid = false;

  constructor(name: string, address: string, rent: number) {
    this.name = name;
    this.address = address;
    this.rent = rent;
  }

  /**
   * this function returns the name of the property.
   */
  getName() {
    return this.name;
  }

  /**
   * this function sets the name of the property.
   * @param name - name to be set.
   */
  setName(name: string) {
    this.name = name;
  }

  /**
   * this function returns the rent of the property.
   */
  getRent() {
    return this.rent;
  }

  /**
   * this function sets the rent for this property.
   * @param rent - rent to be set.
   */
  setRent(rent: number) {
    this.rent = rent;
  }

  /**
   * this functions returns the tenant currently residing in this property.
   */
  getTenant() {
    return this.tenant;
  }

  /**
   * this function sets the tenant currently residing in this property.
   * @param tenant - tenant to be set.
   */
  setTenant(tenant: Tenant) {
    this.tenant = tenant;
    this.occupied = true;
  }

  /**
   * this function removes the tenant from this property.
   */
  removeTenant() {
    this.tenant = null;
    this.occupied = false;
  }

  /**
   * this function returns whether this property paid
   */
  getPaid() {
    return this.paid;
  }

  /**
   * this function sets the value whether this property paid
   * @param isPaid - the value to set
   */
  setPaid(isPaid: boolean) {
    this.paid = isPaid;
  }
}
