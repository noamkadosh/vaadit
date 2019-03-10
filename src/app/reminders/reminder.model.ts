export class Reminder {
  private description: string;
  private date: Date;
  private priority: ReminderPriority;
  private status: ReminderStatus = ReminderStatus.Open;

  constructor(description: string, date: Date, priority: ReminderPriority) {
    this.description = description;
    this.date = date;
    this.priority = priority;
  }

  /**
   * this function returns the description of the reminder
   */
  getDescription() {
    return this.description;
  }

  /**
   * this function sets the description of the reminder
   * @param description - the description to be set
   */
  setDescription(description: string) {
    this.description = description;
  }

  /**
   * this function returns the priority of the reminder
   */
  getPriority() {
    return this.priority;
  }

  /**
   * this function sets the priority of the reminder
   * @param priority - the reminder's priority
   */
  setPriority(priority: ReminderPriority) {
    this.priority = priority;
  }

  /**
   * this function returns the status of the reminder
   */
  getStatus() {
     return this.status;
  }

  /**
   * this function completes the reminder
   */
  completeReminder() {
    this.status = ReminderStatus.Completed;
  }

  /**
   * this function opens the reminder
   */
  openReminder() {
    this.status = ReminderStatus.Open;
  }

  getDate() {
    return this.date;
  }

  setDate(date: Date) {
    this.date = date;
  }
}

export enum ReminderPriority {
  Low = 'נמוכה',
  Medium = 'בינונית',
  High = 'גבוהה',
}

export enum ReminderStatus {
  Open = 'פתוחה',
  Due = 'לטיפול',
  Completed = 'הושלמה'
}
