import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface OnBoardingState {
  stepOne: {
    name: string;
    email: string;
    isStateAvailable: boolean;
  };
  stepTwo: {
    street: string,
    address: string,
    state: string,
  };
  stepThree: {
    children: number,
    childrenNames: string[]
  };
}

export function createInitialState(): OnBoardingState {
  return {
    stepOne: {
      name: 'name',
      email: 'email',
      isStateAvailable: false
    },
    stepTwo: {
      street: 'street',
      address: 'address',
      state: ''
    },
    stepThree: {
      children: 2,
      childrenNames: ['ch1', 'ch2']
    }
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'on-boarding' })
export class OnBoardingStore extends Store<OnBoardingState> {

  constructor() {
    super(createInitialState());
  }

  updateAddress(address: string) {
    this.update(state => {
      return {
        stepTwo: {
          ...state.stepTwo,
          address,
        }
      };
    });
  }
}
