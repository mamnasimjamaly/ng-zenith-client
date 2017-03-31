export class EventsByDay {
    public events : any[];
    public weekNo : number;
    public date : Date;

    constructor(events: any[], weekNo: number, date :Date) {
        this.events = events;
        this.weekNo = weekNo;
        this.date = date;
    }
}