import { Injectable } from '@angular/core';
import {ReminderPriority, Reminder} from './reminder.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RemindersService {
  private reminderIndexToEdit: number;
  private remindersChanged = new Subject<Reminder[]>();
  private reminders: Reminder[] = [
    new Reminder(
      'תשלום שכירות עד ה-10', new Date(2019, 1, 5), ReminderPriority.Low
    ),
    new Reminder(
      'תשלום חשבונות עד ה-10', new Date(2019, 4, 1), ReminderPriority.Medium
    ),
    new Reminder(
      'ללכת לבנק', new Date(2019, 3, 4), ReminderPriority.High
    ),
    new Reminder(
      'לדבר עם בלה בלה בלה', new Date(2020, 1, 11), ReminderPriority.Low
    ),
    new Reminder(
      'אין לי מה לרשום פה', new Date(2019, 2, 11), ReminderPriority.Low
    ),
    new Reminder(
      'תזכורת, צריך לאכול', new Date(2021, 6, 1), ReminderPriority.Low
    ),
    new Reminder(
      'משעמם לי ואני לא יודע מה לרשום', new Date(2019, 6, 15), ReminderPriority.Low
    ),
    new Reminder(
      'סתם תזכורת נוספת', new Date(2019, 11, 20), ReminderPriority.Low
    ),
    new Reminder(
      'תשלום שכירות עד ה-10', new Date(2020, 10, 7), ReminderPriority.Low
    ),
    new Reminder(
      'תשלום שכירות עד ה-10', new Date(2019, 10, 17), ReminderPriority.Low
    ),
  ];

  constructor() { }

  getReminders() {
    this.sortByDate();
    return this.reminders;
  }

  getReminder(index: number) {
    return this.reminders[index];
  }

  sortByDate() {
    this.reminders.sort(function(a, b) {
      return a.getDate().getTime() - b.getDate().getTime();
    });
  }

  private toTimeStamps() {
    const timestampArray: number[] = [];
    this.reminders.forEach((value, i) => {
      timestampArray[i] = value.getDate().getTime();
    });
    return timestampArray;
  }

  getReminderIndexToEdit() {
    return this.reminderIndexToEdit;
  }

  setReminderIndexToEdit(index: number) {
    this.reminderIndexToEdit = index;
  }

  addReminder(reminder: Reminder) {
    this.reminders.push(reminder);
    this.sortByDate();
    this.remindersChanged.next(this.reminders.slice());
  }

  updateReminder(index: number, newReminder: Reminder) {
    this.reminders[index] = newReminder;
  }

  deleteReminder(index: number) {
    this.reminders.splice(index, 1);
    this.remindersChanged.next(this.reminders.slice());
  }
}
