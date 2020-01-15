import { Injectable } from '@angular/core';
import { Store, StoreConfig, arrayAdd, arrayUpdate } from '@datorama/akita';
import { GridDataItem } from './grid-data-item.model';

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
    gridData: GridDataItem[]
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
      state: '',
      gridData: [
        { id: 1, name: 'name 2.1', count: 210 },
        { id: 2, name: 'name 3.1', count: 310 }
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
    // this.update({ address });
    this.update(state => {
      return {
        stepTwo: {
          ...state.stepTwo,
          address,
        }
      };
    });
  }

  addGridDataItem(gridItem: GridDataItem) {
    this.update(state => ({
      stepTwo: {
        ...state.stepTwo,
        gridData: arrayAdd(state.stepTwo.gridData, gridItem)
      }
    }));
  }

  updateGridDataItem(id: number, gridItem: Partial<GridDataItem>) {
    this.update(state => ({
      stepTwo: {
        ...state.stepTwo,
        gridData: arrayUpdate(state.stepTwo.gridData, id, gridItem)
      }
    }));
  }
}
