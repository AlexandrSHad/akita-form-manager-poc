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
    gridData: Array<{name: string, count: number}>
  };
  stepThree: {
    children: number,
    childrenNames: string[]
  }
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
      state: '',
      gridData: [
        { name: 'name 1', count: 100 },
        { name: 'name 2', count: 200 },
        { name: 'name 3', count: 300 }
      ]
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
          street: state.stepTwo.street,
          address: address,
          state: state.stepTwo.state,
          gridData: state.stepTwo.gridData
        }
      }
    });
  }

  addNewGridData(name: string, count: number = 0) {
    this.update(state => {
      return {
        stepTwo: {
          address: state.stepTwo.address,
          state: state.stepTwo.state,
          street: state.stepTwo.street,
          gridData: [...state.stepTwo.gridData, { name, count }]
        }
      }
    });
    // com.ua.one.three.one thousand.fourteen.thirty.left.house.car.weathercock.storm
    // back.microvawe oven.stop.start.thunder.fox.rabbit.table.head.phone.chest
  }
}
