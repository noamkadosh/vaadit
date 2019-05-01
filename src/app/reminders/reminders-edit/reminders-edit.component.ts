import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RemindersService} from '../reminders.service';
import {Reminder} from '../reminder.model';

@Component({
  selector: 'app-reminders-edit',
  templateUrl: './reminders-edit.component.html',
  styleUrls: ['./reminders-edit.component.scss']
})
export class RemindersEditComponent implements OnInit {
  id: number;
  editMode = false;
  reminderForm: FormGroup;

  constructor(private reminderService: RemindersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // checking according to the route what mode we're in
    this.editMode = this.router.url.indexOf('/edit') > -1;
    if (this.editMode) { // only edit mode needs the id
      this.id = this.reminderService.getReminderIndexToEdit();
    }
    this.initForm();
  }

  /**
   * this function initializes the property form.
   */
  private initForm() {
    // new property mode
    // empty fields
    let reminderDesc = '';
    let reminderDate: Date;
    let reminderPriority: string;

    if (this.editMode) {
      // edit reminder mode
      // fetching the current reminder's data
      const reminder = this.reminderService.getReminder(this.id);
      reminderDesc = reminder.getDescription();
      reminderDate = reminder.getDate();
      reminderPriority = reminder.getPriorityValue();
    }
    // const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    // initializing the form according to the relevant data
    this.reminderForm = new FormGroup({
      'desc': new FormControl(reminderDesc, Validators.required),
      'date': new FormControl(reminderDate, Validators.required),
      'priority': new FormControl(reminderPriority, Validators.required),
    });
  }

  /**
   * this function handles the submission if the property form.
   */
  onSubmit() {
    // Edit Mode
    if (this.editMode) {
      const newReminder = new Reminder(
        this.reminderForm.value['desc'],
        this.reminderForm.value['date'],
        undefined);
      newReminder.setPriority(this.reminderForm.value['priority']);

        // updating the property
        this.reminderService.updateReminder(this.id, newReminder);
      // New Mode
    } else {
      // creating the new property
      const newReminder = new Reminder(
        this.reminderForm.value['desc'],
        this.reminderForm.value['date'],
        undefined);
      newReminder.setPriority(this.reminderForm.value['priority']);
      // adding the reminder to the data
      this.reminderService.addReminder(newReminder);
    }
    // this call is only to navigate away from the page at submission.
    this.onCancel();
  }

  /**
   * this function handles the cancellation of the form simply by navigating back.
   */
  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
