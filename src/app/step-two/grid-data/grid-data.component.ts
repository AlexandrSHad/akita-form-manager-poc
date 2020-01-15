import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { GridDataItem } from 'src/app/state/grid-data-item.model';
import { OnBoardingQuery } from 'src/app/state/on-boarding.query';

@Component({
  selector: 'app-grid-data',
  templateUrl: './grid-data.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: GridDataComponent
  }]
  // {
  //   provide: NG_VALIDATORS,
  //   multi: true,
  //   useExisting: GenericInputComponent
  // }
})
export class GridDataComponent implements OnInit, ControlValueAccessor {
  data: Array<{ name: string, count: number }> = [];
  data$: Observable<GridDataItem[]>;
  onChangeFn: () => void;

  constructor(private query: OnBoardingQuery) {
    this.data$ = this.query.allGridDataItems$;
  }

  writeValue(data: any): void {
    this.data = data;
  }
  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }
  registerOnTouched(fn: any): void {
    // throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error("Method not implemented.");
  }

  ngOnInit() {
  }

}
