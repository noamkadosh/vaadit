import {Directive, HostListener} from '@angular/core';
import {NavigationService} from '../navigation/navigation.service';

@Directive({
  selector: '[appMenuButton]'
})
export class MenuButtonDirective {

  constructor(private navigationService: NavigationService) { }

  @HostListener('click') onClick() {
    this.navigationService.toggleNavigation();
  }
}
