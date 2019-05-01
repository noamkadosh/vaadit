import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { RemindersWidgetComponent } from './home/reminders-widget/reminders-widget.component';
import { DonutComponent } from './shared/donut-chart/donut/donut.component';
import { DonutChartComponent } from './shared/donut-chart/donut-chart.component';
import { DonutDetailsComponent } from './shared/donut-chart/donut-details/donut-details.component';
import { PropertiesComponent } from './properties/properties.component';
import { PropertiesListComponent } from './properties/properties-list/properties-list.component';
import { PropertiesDetailComponent } from './properties/properties-detail/properties-detail.component';
import { PropertiesEditComponent } from './properties/properties-edit/properties-edit.component';
import {AppRoutingModule} from './app-routing.module';
import { TenantsComponent } from './tenants/tenants.component';
import { TenantsListComponent } from './tenants/tenants-list/tenants-list.component';
import { TenantsDetailsComponent } from './tenants/tenants-details/tenants-details.component';
import { TenantsEditComponent } from './tenants/tenants-edit/tenants-edit.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { MaintenanceListComponent } from './maintenance/maintenance-list/maintenance-list.component';
import { MaintenanceEditComponent } from './maintenance/maintenance-edit/maintenance-edit.component';
import { CollapseContentDirective } from './shared/collapse-content.directive';
import {PropertyService} from './properties/property.service';
import {TenantService} from './tenants/tenant.service';
import { ReportsComponent } from './reports/reports.component';
import { PropertiesHomeComponent } from './properties/properties-home/properties-home.component';
import {ReactiveFormsModule} from '@angular/forms';
import { DropdownDirective } from './shared/dropdown.directive';
import { TenantsHomeComponent } from './tenants/tenants-home/tenants-home.component';
import { MaintenanceHomeComponent } from './maintenance/maintenance-home/maintenance-home.component';
import { RemindersComponent } from './reminders/reminders.component';
import { RemindersHomeComponent } from './reminders/reminders-home/reminders-home.component';
import { RemindersListComponent } from './reminders/reminders-list/reminders-list.component';
import { RemindersEditComponent } from './reminders/reminders-edit/reminders-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatButtonModule, MatButtonToggleModule,
  MatDatepickerModule, MatDividerModule, MatExpansionModule,
  MatFormFieldModule, MatGridListModule, MatIconModule,
  MatInputModule, MatListModule,
  MatNativeDateModule, MatRippleModule,
  MatSelectModule, MatSidenavModule, MatToolbarModule
} from '@angular/material';
import { NavigationComponent } from './navigation/navigation.component';
import { MenuButtonDirective } from './header/menu-button.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    RemindersWidgetComponent,
    DonutComponent,
    DonutChartComponent,
    DonutDetailsComponent,
    PropertiesComponent,
    PropertiesListComponent,
    PropertiesDetailComponent,
    PropertiesEditComponent,
    TenantsComponent,
    TenantsListComponent,
    TenantsDetailsComponent,
    TenantsEditComponent,
    MaintenanceComponent,
    MaintenanceListComponent,
    MaintenanceEditComponent,
    CollapseContentDirective,
    ReportsComponent,
    PropertiesHomeComponent,
    DropdownDirective,
    TenantsHomeComponent,
    MaintenanceHomeComponent,
    RemindersComponent,
    RemindersHomeComponent,
    RemindersListComponent,
    RemindersEditComponent,
    NavigationComponent,
    MenuButtonDirective,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatGridListModule,
    MatBadgeModule,
    MatAutocompleteModule,
    MatRippleModule,
    MatExpansionModule,
    MatButtonToggleModule
  ],
  providers: [
    PropertyService,
    TenantService,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatGridListModule,
    MatBadgeModule,
    MatAutocompleteModule,
    MatRippleModule,
    MatExpansionModule,
    MatButtonToggleModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
