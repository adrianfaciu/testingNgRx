import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class AppService {
  getDummyData() {
    // XHR call or some other async operation that returns an observable
    const dummyData = {};
    return Observable.of(dummyData);
  }
}
