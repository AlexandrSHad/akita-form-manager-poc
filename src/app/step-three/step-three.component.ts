import {
  FormArray,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { OnBoardingFormsState } from '../on-boarding/on-boarding-forms.state';
import { PersistNgFormPlugin } from '@datorama/akita';
import { OnBoardingQuery } from '../state/on-boarding.query';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html'
})
export class StepThreeComponent implements OnInit, OnDestroy {
  form: FormGroup;
  private pngfp: PersistNgFormPlugin;

  constructor(
    private builder: FormBuilder,
    private formsManager: AkitaNgFormsManager<OnBoardingFormsState>,
    private query: OnBoardingQuery,
  ) { }

  ngOnInit() {
    this.form = this.builder.group({
      children: ['', Validators.required],
      childrenNames: this.builder.array([])
    });

    const createChildName = () => this.builder.control('', Validators.required);

    this.formsManager.upsert('stepThree', this.form, {
      arrControlFactory: {
        childrenNames: createChildName
      }
    });

    // // if subscribe to form control value then it is required to pass { emitEvent: true } as parameter to PersistNgFormPlugin constructor
    // this.form
    //   .get('children')
    //   .valueChanges.pipe(untilDestroyed(this))
    //   .subscribe(val => {
    //     const childrenNames = this.form.get('childrenNames') as FormArray;
    //     while (childrenNames.length > val) {
    //       childrenNames.removeAt(childrenNames.length - 1);
    //     }
    //     if (val) {
    //       for (let i = childrenNames.length; i < val; i++) {
    //         childrenNames.push(createChildName());
    //       }
    //     }
    //   });

    // // this.pngfp = new PersistNgFormPlugin(this.query, 'stepThree', { emitEvent: true }).setForm(this.form);

    // or subscribe to value from state
    this.query.select(onBoardingState => onBoardingState.stepThree.children)
      .pipe(untilDestroyed(this))
      .subscribe(val => {
        const childrenNames = this.form.get('childrenNames') as FormArray;
        while (childrenNames.length > val) {
          childrenNames.removeAt(childrenNames.length - 1);
        }
        if (val) {
          for (let i = childrenNames.length; i < val; i++) {
            childrenNames.push(createChildName());
          }
        }
      });

    this.pngfp = new PersistNgFormPlugin(this.query, 'stepThree').setForm(this.form);
  }

  ngOnDestroy() {
    this.pngfp.destroy();
  }
}
