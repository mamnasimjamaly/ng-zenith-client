import { Component, OnInit } from '@angular/core';
import { Event } from '../event';
import { Activity } from '../activity';
import { ActivityService } from '../activity.service';
import { EventService } from '../event.service';
import { EventIdWeekNumber } from '../eventIDweekNumber';
import { EventsByDay } from '../eventsByDay';
@Component({
  selector: 'event-component',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  providers: [EventService, ActivityService]
})
export class EventsComponent implements OnInit {

  events: Event[];
  events1: Event[];
  activities: Activity[];
  currentViewWeek: number;
  currentYear: number;
  currentWeek: number;
  disablePrevBtn: boolean;
  disableNextBtn: boolean;
  eventsByDay: EventsByDay[];
  dates: Date[];
  //[event, weeknumber]
  weekNumbers: EventIdWeekNumber[];
  constructor(private eventService: EventService,
    private activityService: ActivityService) {
    this.weekNumbers = [];
    this.events1 = [];
    this.currentWeek = this.getWeek(new Date(Date.now()));
    this.currentViewWeek = this.currentWeek;
    this.disablePrevBtn = true;
    this.disableNextBtn = true;
    this.currentYear = new Date().getFullYear();
    this.eventsByDay = [];
    this.dates = [];
  }

  getEvents(): void {
    this.eventService.getEventsWithAuth()
      .then(events => this.events = events)
      .then(this.addSomething.bind(this));
  }

  getAllDates() : void {
    //this.dates =[];
    for(let e of this.events) {
      if(!this.dates.some(d => this.convertDateToString(d) == this.convertDateToString(e.eventDateTimeFrom))) {
        this.dates.push(new Date(e.eventDateTimeFrom));
      }
    }
    console.log(this.dates);
  }

  convertDateToString(date: Date) : string {
     date = new Date(date);
      return date.getFullYear().toString() + date.getMonth().toString()  + date.getDate().toString();
  }

  dateExists(date : Date) : boolean {
    //let dateX = new Date(date);
    //console.log(this.convertDateToString(dateX));
    
    this.dates.forEach(d =>{
      console.log(this.convertDateToString(d));
      console.log(this.convertDateToString(date));
      if(this.convertDateToString(d) == this.convertDateToString(date)) {
        return true;
      }      
    }); 
    return false;
  }




  findDescById(id: number): string {
    for (let a of this.activities) {
      if (a.activityId == id) {
        return a.activityDescription;
      }
    }
    return null;
  }

  ngOnInit(): void {
    this.getEvents();
    //this.groupEventsByDay();
  }

  getWeek(date: Date): number {

    // Create a copy of this date object  
    date = new Date(date);
    let target = date;

    // ISO week date weeks start on monday, so correct the day number  

    var dayNr = (date.getDay() + 6) % 7;

    // Set the target to the thursday of this week so the  
    // target date is in the right year  
    target.setDate(target.getDate() - dayNr + 3);

    // ISO 8601 states that week 1 is the week with january 4th in it  
    let jan4 = new Date(target.getFullYear(), 0, 4);

    // Number of days between target date and january 4th  
    var dayDiff = (target.getTime() - jan4.getTime()) / 86400000;

    if (new Date(target.getFullYear(), 0, 1).getDay() < 5) {
      // Calculate week number: Week 1 (january 4th) plus the    
      // number of weeks between target date and january 4th    
      return 1 + Math.ceil(dayDiff / 7);
    }
    else {  // jan 4th is on the next week (so next week is week 1)
      return Math.ceil(dayDiff / 7);
    }
  }

  addSomething(eventsList: Event[]): void {
    for (let e of eventsList) {
      let weekNo = this.getWeek(e.eventDateTimeFrom);
      this.weekNumbers.push(new EventIdWeekNumber(e, weekNo));
      //console.log(currentWeekNumber);
      if (weekNo == this.currentWeek) {
        this.events1.push(e);
      }
    }
    //console.log(this.weekNumbers);
    this.disablePrevBtn = (this.currentWeek <= this.findMinWeek());
    this.disableNextBtn = (this.currentWeek >= this.findMaxWeek());
    this.getAllDates();
    this.groupEventsByDay();
  }

  clickPreviousBtn(): void {
    this.currentViewWeek--;
    //console.log(this.currentViewWeek + " current view week");
    //console.log("prev");
    if (this.findMinWeek() >= this.currentViewWeek && (this.currentWeek >= this.currentViewWeek)) {
      this.disablePrevBtn = true;

    }
    this.disableNextBtn = false;
    this.getEventsByWeekNo(this.currentViewWeek);
  }

  clickNextBtn(): void {
    this.currentViewWeek++;
    //console.log(this.currentViewWeek + " current view week");
    //console.log("next");
    if (this.findMaxWeek() <= this.currentViewWeek && (this.currentWeek <= this.currentViewWeek)) {
      this.disableNextBtn = true;

    }
    this.disablePrevBtn = false;
    this.getEventsByWeekNo(this.currentViewWeek);
    //console.log(this.events1);
  }

  getEventsByWeekNo(weekNo: number): void {
    this.events1 = [];
    console.log("From get events " + weekNo);
    for (let e of this.weekNumbers) {
      if (e.weekNo == weekNo) {
        this.events1.push(e.event);
      }
    }
  }

  groupEventsByDay(): void {
    this.eventsByDay = [];
    this.dates.forEach(d => {
      let dv = new EventsByDay([], this.getWeek(d), d);
      this.eventsByDay.push(dv);
    }); 
    
    this.events.forEach(e => {
      if(this.eventsByDay.some(ed => this.convertDateToString(ed.date) == this.convertDateToString(e.eventDateTimeFrom))) {
        let evDay = this.eventsByDay.find(ed => this.convertDateToString(ed.date) == this.convertDateToString(e.eventDateTimeFrom));
        evDay.events.push(e);
      }
    });
    console.log(this.eventsByDay);
  }

  getEventsByDayByWeekNo(weekNo : number) : EventsByDay[] {
   let eds : EventsByDay[];
   eds= [];
   this.eventsByDay.forEach(ed => {
      if(ed.weekNo == weekNo) {
        eds.push(ed);
      }
   });
   return eds;
  }



  //to do
  findMaxWeek(): number {
    let max = 0;
    for (let e of this.weekNumbers) {
      if (e.weekNo > max)
        max = e.weekNo;
    }
    console.log("max " + max);
    return max;
  }
  //to do
  findMinWeek(): number {
    let min = 52;
    for (let e of this.weekNumbers) {
      if (min > e.weekNo)
        min = e.weekNo;
    }
    console.log(min);
    return min;
  }
}