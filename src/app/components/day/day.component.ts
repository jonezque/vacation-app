import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

interface Day {
  weekend: boolean;
  picked: boolean;
  free: boolean;
}

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnChanges {
  @Input() year = 2019;
  @Input() month = -1;
  days: Array<Day> = [];
  constructor() { }

  ngOnChanges() {
    console.log(this.month);
    console.log(this.year);
    const list = [];
    for (let i = 0; i < this.getDaysInMonth(); i++) {
      list.push({});
    }
    this.days = list;
  }

  getDaysInMonth() {
    return new Date(this.year, this.month + 1, 0).getDate();
  }

  dayClicked(idx: number) {
    this.days[idx].picked = !this.days[idx].picked;
  }
}
