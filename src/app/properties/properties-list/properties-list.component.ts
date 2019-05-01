import { Component, OnInit } from '@angular/core';
import {Property} from '../property.model';
import {PropertyService} from '../property.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.scss']
})
export class PropertiesListComponent implements OnInit {
  properties: Property[];
  // subscription to track changes in properties array
  propertiesSubscription: Subscription;

  constructor(private propertyService: PropertyService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // subscribing to changes in properties and changing the list
    this.propertiesSubscription = this.propertyService.propertiesChanged
      .subscribe(
        (properties: Property[]) => {
          this.properties = properties;
        }
      );
    this.properties = this.propertyService.getProperties();
  }

  /**
   * This function sets the property that should be edited and then navigates to the edit page.
   * @param index - index of the property to edit.
   */
  onEditProperty(index: number) {
    this.propertyService.setPropertyIndexToEdit(index);
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  /**
   * This function uses the property service to delete a property.
   */
  onDeleteProperty(index: number) {
    this.propertyService.deleteProperty(index);
  }
}
