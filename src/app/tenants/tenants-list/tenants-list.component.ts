import { Component, OnInit } from '@angular/core';
import {Tenant} from '../tenant.model';
import {TenantService} from '../tenant.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-tenants-list',
  templateUrl: './tenants-list.component.html',
  styleUrls: ['./tenants-list.component.scss']
})
export class TenantsListComponent implements OnInit {
  tenants: Tenant[];
  tenantsSubscription: Subscription;

  constructor(private tenantService: TenantService,
              private router: Router,
              private  route: ActivatedRoute) { }

  ngOnInit() {
    // subscribing to changes in properties and changing the list
    this.tenantsSubscription = this.tenantService.tenantsChanged
      .subscribe(
        (tenants: Tenant[]) => {
          this.tenants = tenants;
        }
      );
    this.tenants = this.tenantService.getTenants();
  }

  /**
   * This function sets the property that should be edited and then navigates to the edit page.
   * @param index - index of the property to edit.
   */
  onEditTenant(index: number) {
    this.tenantService.setTenantIndexToEdit(index);
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  /**
   * This function uses the property service to delete a property.
   */
  onDeleteTenant(index: number) {
    this.tenantService.deleteTenant(index);
  }
}
