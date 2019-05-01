import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  toggleNavigationSubject = new Subject();

  constructor() { }

  toggleNavigation() {
    this.toggleNavigationSubject.next();
  }
}
