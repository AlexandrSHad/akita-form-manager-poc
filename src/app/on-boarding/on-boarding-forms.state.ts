export interface OnBoardingFormsState {
  stepOne: {
    name: string;
    email: number;
    isStateAvailable: boolean;
  };
  stepTwo: {
    street: string,
    address: string,
    state: string
  };
  stepThree: {
    children: number,
    childrenNames: string[]
  }
}