import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';
import { OnBoardingFormsState } from '../on-boarding/on-boarding-forms.state';
import { PersistNgFormPlugin } from '@datorama/akita';
import { OnBoardingQuery } from '../state/on-boarding.query';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html'
})
export class StepOneComponent implements OnInit, OnDestroy {
  form: FormGroup;
  private pngfp: PersistNgFormPlugin;

  constructor(
    private builder: FormBuilder,
    private formsManager: AkitaNgFormsManager<OnBoardingFormsState>,
    private query: OnBoardingQuery,
  ) { }

  ngOnInit() {
    console.log('step 1: init');
    this.form = this.builder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      isStateAvailable: ['']
    });

    this.formsManager.upsert('stepOne', this.form);

    // NOTICE:
    // * 2nd parameter: if string - gets init values from state,
    //   if function - gets init values from object returned from that function
    this.pngfp = new PersistNgFormPlugin(this.query, 'stepOne').setForm(this.form);
  }

  ngOnDestroy() {
    console.log('step 1: destroy');
    this.pngfp.destroy();
  }
}
