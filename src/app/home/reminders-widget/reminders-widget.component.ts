import { Component, OnInit } from '@angular/core';
import {Reminder} from '../../reminders/reminder.model';
import {RemindersService} from '../../reminders/reminders.service';

@Component({
  selector: 'app-reminders-widget',
  templateUrl: './reminders-widget.component.html',
  styleUrls: ['./reminders-widget.component.scss']
})
export class RemindersWidgetComponent implements OnInit {
  nextReminders: Reminder[];
  now: Date;

  constructor(private reminderService: RemindersService) { }

  ngOnInit() {
    const reminders = this.reminderService.getReminders();
    this.nextReminders = reminders.slice(0, 4);
    this.now = new Date();
  }

}
