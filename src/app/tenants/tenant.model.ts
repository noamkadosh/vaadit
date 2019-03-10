import {Property} from '../properties/property.model';

export class Tenant {
  readonly name: string;
  private phone: string;
  private property: Property = null;

  constructor(name: string, phone: string) {
    this.name = name;
    this.phone = phone;
  }

  /**
   * this function returns the tenant's name
   */
  getName() {
    return this.name;
  }

  /**
   * this function returns the tenant's phone number
   */
  getPhone() {
    return this.phone;
  }

  /**
   * this function sets the tenant's phone number
   * @param phone - the new phone number
   */
  setPhone(phone: string) {
    this.phone = phone;
  }

  /**
   * this function returns the property the tenant currently reside in
   */
  getProperty() {
    return this.property;
  }

  /**
   * this function sets the property the tenant currently resides in
   * @param property - the new property
   */
  setProperty(property: Property) {
    this.property = property;
  }

  /**
   * this function removes the property from the tenant
   */
  removeProperty() {
    this.property = null;
  }
}
