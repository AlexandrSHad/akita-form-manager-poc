import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';
import { OnBoardingFormsState } from '../on-boarding/on-boarding-forms.state';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html'
})
export class StepOneComponent implements OnInit, OnDestroy {
  form: FormGroup;

  constructor(
    private builder: FormBuilder,
    private formsManager: AkitaNgFormsManager<OnBoardingFormsState>
  ) {}

  ngOnInit() {
    console.log('step 1: init');
    this.form = this.builder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      isStateAvailable: ['']
    });

    this.formsManager.upsert('stepOne', this.form, { persistForm: true });
  }

  ngOnDestroy() {
    console.log('step 1: destroy');
  }
}
