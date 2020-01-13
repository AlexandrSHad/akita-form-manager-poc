import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GridDataItemsStore, GridDataItemsState } from 'src/app/state/grid-data-items.store';
import { GridDataItemsQuery } from 'src/app/state/grid-data-items.query';
import { Observable } from 'rxjs';
import { GridDataItem } from 'src/app/state/grid-data-item.model';

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
  onChangeFn: Function;

  constructor(private gridDataItemsStore: GridDataItemsStore, private gridDataItemsQuery: GridDataItemsQuery) {
    this.data$ = this.gridDataItemsQuery.selectAll();
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
