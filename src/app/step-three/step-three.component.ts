import {
  FormArray,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { OnBoardingFormsState } from '../on-boarding/on-boarding-forms.state';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html'
})
export class StepThreeComponent implements OnInit {
  form: FormGroup;

  constructor(
    private builder: FormBuilder,
    private formsManager: AkitaNgFormsManager<OnBoardingFormsState>
  ) {}

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

    this.form
      .get('children')
      .valueChanges.pipe(untilDestroyed(this))
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
  }

  ngOnDestroy(): void {}
}
