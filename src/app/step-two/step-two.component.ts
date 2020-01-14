import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AkitaNgFormsManager, setValidators } from '@datorama/akita-ng-forms-manager';
import { OnBoardingFormsState } from '../on-boarding/on-boarding-forms.state';
import { OnBoardingQuery } from '../state/on-boarding.query';
import { PersistNgFormPlugin } from '@datorama/akita';
import { OnBoardingStore } from '../state/on-boarding.store';
import { GridDataItemsStore } from '../state/grid-data-items.store';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html'
})
export class StepTwoComponent implements OnInit {
  form: FormGroup;
  private pngfp: PersistNgFormPlugin;

  constructor(
    private builder: FormBuilder,
    private formsManager: AkitaNgFormsManager<OnBoardingFormsState>,
    private store: OnBoardingStore,
    private query: OnBoardingQuery,
    private gridDataItemsStore: GridDataItemsStore
  ) { }

  ngOnInit() {
    this.form = this.builder.group({
      street: ['', Validators.required],
      address: ['', Validators.required],
      state: ['']
    });

    this.formsManager.upsert('stepTwo', this.form);

    // this.formsManager.selectValue<boolean>("stepOne", "isStateAvailable").subscribe(isStateAvailable => {
    //   if (isStateAvailable) {
    //     console.log('enable');
    //     this.form.get('state').enable();
    //     setValidators(this.form.get('state'), Validators.required);
    //   } else {
    //     console.log('disable');
    //     this.form.get('state').disable();
    //     setValidators(this.form.get('state'), null);
    //   }
    // });

    this.query.select(onBoardingState => onBoardingState.stepOne.isStateAvailable)
      .subscribe(isStateAvailable => {
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

    this.pngfp = new PersistNgFormPlugin(this.query, 'stepTwo').setForm(this.form);
  }

  addNew() {
    this.store.updateAddress('new address');
    // this.store.addNewGridData('new name', 222);
    this.gridDataItemsStore.add({ id: 3, name: 'new name', count: 222 });
  }

  updateExisting() {
    this.gridDataItemsStore.update(2, entity => {
      const newCount = entity.count + 1;
      return { name: `updated name ${newCount}`, count: newCount };
    });
  }
}
