import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventCommunicationsService {
  event = new Subject<any>();
  fieldSelected: Subject<any>;
  itemDeleted: Subject<any>;
  tableColumnSelected: Subject<any>;

  getEvent() {
    return this.event.asObservable();
  }

  on(eventName) {
    return this.getEvent().pipe(
      filter(event => event.name === eventName),
      map(event => event.data)
    );
  }

  broadcast(eventName, data) {
    this.event.next({
      name: eventName,
      data
    });
  }

  constructor() {
    this.fieldSelected = new Subject();
    this.itemDeleted = new Subject();
    this.tableColumnSelected = new Subject();
  }

}
