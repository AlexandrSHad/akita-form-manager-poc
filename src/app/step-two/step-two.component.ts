import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AkitaNgFormsManager, setValidators } from '@datorama/akita-ng-forms-manager';
import { OnBoardingFormsState } from '../on-boarding/on-boarding-forms.state';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html'
})
export class StepTwoComponent implements OnInit {
  form: FormGroup;

  constructor(
    private builder: FormBuilder,
    private formsManager: AkitaNgFormsManager<OnBoardingFormsState>
  ) {}

  ngOnInit() {
    this.form = this.builder.group({
      street: ['', Validators.required],
      address: ['', Validators.required],
      state: ['']
    });

    this.formsManager.upsert('stepTwo', this.form);

    this.formsManager.selectValue<boolean>("stepOne", "isStateAvailable").subscribe(isStateAvailable => {
      if (isStateAvailable) {
        console.log('enable');
        this.form.get('state').enable();
        setValidators(this.form.get('state'), Validators.required);
      } else {
        console.log('disable');
        this.form.get('state').disable();
        setValidators(this.form.get('state'), null);
      }
    });
  }
}
