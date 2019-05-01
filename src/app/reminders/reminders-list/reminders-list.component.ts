import { Component, OnInit } from '@angular/core';
import {Reminder} from '../reminder.model';
import {RemindersService} from '../reminders.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-reminders-list',
  templateUrl: './reminders-list.component.html',
  styleUrls: ['./reminders-list.component.scss']
})
export class RemindersListComponent implements OnInit {
  reminders: Reminder[];
  now: Date;

  constructor(private remindersService: RemindersService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.remindersService.sortByDate();
    this.reminders = this.remindersService.getReminders();
    this.now = new Date();
  }

  onEditReminder(index: number) {
    this.remindersService.setReminderIndexToEdit(index);
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteReminder(index: number) {
    this.remindersService.deleteReminder(index);
  }
}
