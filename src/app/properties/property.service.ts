import { Injectable } from '@angular/core';
import {Property} from './property.model';
import {Subject} from 'rxjs';
import {Tenant} from '../tenants/tenant.model';

@Injectable()
export class PropertyService {
  // subject that is responsible for changes in properties
  propertiesChanged = new Subject<Property[]>();
  // the index of the property to be edited (used when editing a property).
  private propertyIndexToEdit: number;
  tenantChosen: Tenant;
  // the list of properties
  private properties: Property[] = [
    new Property(
      'הבית שלנו', 'מדינת היהודים 12, הרצליה', 5000
    ),
    new Property(
      'הבית של אלון', 'מדינת היהודים 12, הרצליה', 7000
    ),
    new Property(
      'הבית של ההורים', 'קלה 9, קרית אתא', 3000
    ),
    new Property(
      'הבית של אוסנת', 'מיכאל נאמן 20, תל אביב', 5000
    ),
    new Property(
      'הבית שלנו', 'מדינת היהודים 12, הרצליה', 5000
    ),
    new Property(
      'הבית שלנו', 'מדינת היהודים 12, הרצליה', 5000
    ),
  ];

  constructor() {}

  /**
   * this function gets you all properties array.
   */
  getProperties() {
    return this.properties.slice();
  }

  /**
   * this function returns the property at index in properties array.
   * @param index - the index of the property to be returned.
   */
  getProperty(index: number) {
    return this.properties[index];
  }

  /**
   * this function returns the index of the property to be edited.
   */
  getPropertyIndexToEdit() {
    return this.propertyIndexToEdit;
  }

  /**
   * this function sets the index of the property to be edited.
   * @param index - index of the property to be edited.
   */
  setPropertyIndexToEdit(index: number) {
    this.propertyIndexToEdit = index;
  }

  /**
   * this function adds a property to the properties array.
   * @param property - the property to add.
   */
  addProperty(property: Property) {
    this.properties.push(property);
    this.propertiesChanged.next(this.properties.slice());
  }

  /**
   * this function updates a property in the properties array.
   * @param index - index of the property to be edited.
   * @param newProperty - the new edited property to be added.
   */
  updateProperty(index: number, newProperty: Property) {
    this.properties[index].setAddress(newProperty.getAddress());
    this.properties[index].setName(newProperty.getName());
    this.properties[index].setRent(newProperty.getRent());
    if (newProperty.getTenant() !== null) {
      this.properties[index].setTenant(newProperty.getTenant());
    } else {
      this.properties[index].removeTenant();
    }
    this.propertiesChanged.next(this.properties.slice());
  }

  /**
   * this function deletes a property from the properties array.
   * @param index - the index of the property to be deleted in the properties array.
   */
  deleteProperty(index: number) {
    this.properties.splice(index, 1);
    this.propertiesChanged.next(this.properties.slice());
  }

  /**
   * this function returns the number of vacant properties
   */
  getVacancy() {
    let vacant = 0;
    this.properties.forEach(property => {
      if (!property.occupied) {
        vacant++;
      }
    });
    return vacant;
  }

  /**
   * this function returns the number of occupied properties
   */
  getOccupied() {
    return this.properties.length - this.getVacancy();
  }

  /**
   * this function returns the percentage of vacant properties
   */
  getVacancyPercentage() {
    return (this.getVacancy() / this.properties.length) * 100;
  }

  /**
   * this function return the value of all properties that paid monthly rent
   */
  getPaidPropertiesValue() {
    let paidValue = 0;
    for (const property of this.properties) {
      if (property.occupied && property.getPaid()) {
        paidValue += property.getRent();
      }
    }
    return paidValue;
  }

  /**
   * this function returns the value of all properties due rent payment this month
   */
  getDuePropertiesValue() {
    let dueValue = 0;
    for (const property of this.properties) {
      if (property.occupied && !property.getPaid()) {
        dueValue += property.getRent();
      }
    }
    return dueValue;
  }

  /**
   * this function returns the value of all vacant properties
   */
  getVacantPropertiesValue() {
    let vacantValue = 0;
    for (const property of this.properties) {
      if (!property.occupied) {
        vacantValue += property.getRent();
      }
    }
    return vacantValue;
  }
}
