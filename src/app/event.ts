import{Activity} from "./activity";

export class Event {
    public eventId : number;
    public eventDateTimeFrom : Date;
    public eventDateTimeTo : Date;
    public enteredByUsername : string;
    public activityId : number;
    public activity : Activity;
    public creationDate : Date;
    public isActive : boolean; 
    public activityDescr : string;  
}

