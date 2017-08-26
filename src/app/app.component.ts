import { Component } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { AppState } from './store/app.reducer';
import { INCREMENT_ACTION } from './store/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private store: Store<AppState>) { }

  onIncrement() {
    this.store.dispatch({ type: INCREMENT_ACTION });
  }
}
