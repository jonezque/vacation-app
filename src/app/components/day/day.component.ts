import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { DaySyncService } from 'src/app/services/day-sync.service';

const daysOfweek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
class Day {
  weekend: boolean;
  picked: boolean;
  free: boolean;
  date: Date;
  constructor(public day: number, public month: number, public year: number) {
    this.date = new Date(year, month, day);
  }

  getDay() {
    return this.date.getDay();
  }

  getDayName() {
    return daysOfweek[this.getDay()];
  }
}

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnChanges, OnInit {
  @Input() year = 2019;
  @Input() month = -1;
  @Input() index: number;
  days: Array<Day> = [];
  from: number | null = null;

  constructor(private daySync: DaySyncService) { }

  ngOnChanges() {
    const list = [];
    for (let i = 0; i < this.getDaysInMonth(); i++) {
      list.push(new Day(i, this.month, this.year));
    }
    this.days = list;
  }

  ngOnInit() {
    this.daySync.current.subscribe(idx => {
      if (idx !== this.index) {
        this.reset();
      }
    });
  }

  getDaysInMonth() {
    return new Date(this.year, this.month + 1, 0).getDate();
  }

  dayClicked(idx: number) {
    this.days[idx].picked = !this.days[idx].picked;
    this.daySync.setCurrent(this.index);
    this.markRange(this.from, idx);
    this.from = idx;
  }

  reset() {
    this.days.forEach(d => d.picked = false);
    this.from = null;
  }

  markRange(from: number | null, to: number) {
    if (from !== null) {
      const min = Math.min(from, to);
      const max = Math.max(from, to);
      this.days.forEach(d => d.picked = false);
      for (let i = min; i <= max; i++) {
        this.days[i].picked = true;
      }
    }
  }
}
