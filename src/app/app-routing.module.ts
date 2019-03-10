import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PropertiesComponent} from './properties/properties.component';
import {TenantsComponent} from './tenants/tenants.component';
import {MaintenanceComponent} from './maintenance/maintenance.component';
import {ReportsComponent} from './reports/reports.component';
import {PropertiesEditComponent} from './properties/properties-edit/properties-edit.component';
import {PropertiesHomeComponent} from './properties/properties-home/properties-home.component';
import {TenantsEditComponent} from './tenants/tenants-edit/tenants-edit.component';
import {TenantsHomeComponent} from './tenants/tenants-home/tenants-home.component';
import {MaintenanceHomeComponent} from './maintenance/maintenance-home/maintenance-home.component';
import {MaintenanceEditComponent} from './maintenance/maintenance-edit/maintenance-edit.component';
import {RemindersComponent} from './reminders/reminders.component';
import {RemindersHomeComponent} from './reminders/reminders-home/reminders-home.component';
import {RemindersEditComponent} from './reminders/reminders-edit/reminders-edit.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'properties', component: PropertiesComponent, children: [
      { path: '', component: PropertiesHomeComponent, pathMatch: 'full' },
      { path: 'new', component: PropertiesEditComponent },
      { path: 'edit', component: PropertiesEditComponent }
    ] },
  { path: 'tenants', component: TenantsComponent, children: [
      { path: '', component: TenantsHomeComponent, pathMatch: 'full' },
      { path: 'new', component: TenantsEditComponent },
      { path: 'edit', component: TenantsEditComponent }
    ] },
  { path: 'maintenance', component: MaintenanceComponent, children: [
      { path: '', component: MaintenanceHomeComponent, pathMatch: 'full' },
      { path: 'new', component: MaintenanceEditComponent },
      { path: 'edit', component: MaintenanceEditComponent }
    ] },
  { path: 'reports', component: ReportsComponent },
  { path: 'reminders', component: RemindersComponent, children: [
      { path: '', component: RemindersHomeComponent, pathMatch: 'full' },
      { path: 'new', component: RemindersEditComponent },
      { path: 'edit', component: RemindersEditComponent }
    ] }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
