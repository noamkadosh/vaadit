import {Component, OnInit, ViewChild} from '@angular/core';
import {NavigationService} from './navigation/navigation.service';
import {Subscription} from 'rxjs';
import {MatDrawer} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'vaadit';
  navigationSubscription: Subscription;
  @ViewChild('sidenav') sidenav: MatDrawer;

  constructor(private navigationService: NavigationService) {}

  ngOnInit() {
    this.navigationSubscription = this.navigationService.toggleNavigationSubject
      .subscribe(() => {
        this.sidenav.toggle();
      }
    );
  }

}
