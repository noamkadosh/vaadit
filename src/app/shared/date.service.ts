import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  date: Date = new Date();

  constructor() { }

  getHebrewDateString() {
    return this.date.toLocaleString('he-IL', { month: 'long', year: 'numeric' });
  }
}
