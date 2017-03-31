import {Event} from './event';

export class EventIdWeekNumber {
    public event : Event;
    public weekNo : number;
    
    constructor(x: Event, y: number) {
        this.event = x;
        this.weekNo = y;
    }
}