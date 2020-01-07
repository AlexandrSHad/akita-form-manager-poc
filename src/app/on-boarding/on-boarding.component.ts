import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';
import { map, startWith } from 'rxjs/operators';
import { OnBoardingStore,  } from '../state/on-boarding.store';
import { OnBoardingQuery } from '../state/on-boarding.query';
import { OnBoardingFormsState } from './on-boarding-forms.state';

@Component({
  selector: 'app-on-boarding',
  templateUrl: './on-boarding.component.html',
  providers: [OnBoardingStore, OnBoardingQuery],
})
export class OnBoardingComponent implements OnInit {
  form: FormGroup;
  isFormValid$: Observable<boolean>;

  constructor(
    private formsManager: AkitaNgFormsManager<OnBoardingFormsState>
  ) {}

  ngOnInit() {
    console.log('wizard init');
    const stepOneValid$ = this.formsManager
      .selectValid('stepOne')
      .pipe(startWith(false));
    const stepTwoValid$ = this.formsManager
      .selectValid('stepTwo')
      .pipe(startWith(false));
    const stepThreeValid$ = this.formsManager
      .selectValid('stepThree')
      .pipe(startWith(false));

    this.isFormValid$ = combineLatest(stepOneValid$, stepTwoValid$, stepThreeValid$).pipe(
      map(([stepOneValid, stepTwoValid, stepThreeValid]) => {
        return stepOneValid && stepTwoValid && stepThreeValid;
      })
    );
  }

  submit() {
    const stepOneValue = this.formsManager.getForm('stepOne').value;
    const stepTwoValue = this.formsManager.getForm('stepTwo').value;
    const stepThreeValue = this.formsManager.getForm('stepThree').value;
    const formValue = { ...stepOneValue, ...stepTwoValue, ...stepThreeValue };
    console.log('TCL: OnBoardingComponent -> submit -> formValue', formValue);
  }
}
