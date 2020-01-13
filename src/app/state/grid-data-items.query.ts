import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { GridDataItemsState, GridDataItemsStore } from './grid-data-items.store';

@Injectable({
  providedIn: 'root'
})
export class GridDataItemsQuery extends QueryEntity<GridDataItemsState> {

  constructor(protected store: GridDataItemsStore) {
    super(store);
  }
}
