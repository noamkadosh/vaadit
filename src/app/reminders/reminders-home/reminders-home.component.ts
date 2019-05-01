import { Component, OnInit } from '@angular/core';
import {RemindersService} from '../reminders.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-reminders-home',
  templateUrl: './reminders-home.component.html',
  styleUrls: ['./reminders-home.component.scss']
})
export class RemindersHomeComponent implements OnInit {

  constructor(private reminderService: RemindersService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onAddReminder() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
