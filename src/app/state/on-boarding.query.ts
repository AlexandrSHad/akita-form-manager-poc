import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { OnBoardingStore, OnBoardingState } from './on-boarding.store';

@Injectable({ providedIn: 'root' })
export class OnBoardingQuery extends Query<OnBoardingState> {

  allGridDataItems$ = this.select(state => state.stepTwo.gridData);

  constructor(protected store: OnBoardingStore) {
    super(store);
  }
}
