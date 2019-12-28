import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface OnBoardingState {
   key: string;
}

export function createInitialState(): OnBoardingState {
  return {
    key: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'on-boarding' })
export class OnBoardingStore extends Store<OnBoardingState> {

  constructor() {
    super(createInitialState());
  }

}

