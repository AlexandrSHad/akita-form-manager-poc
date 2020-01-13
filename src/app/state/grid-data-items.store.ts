import { EntityState, StoreConfig, EntityStore, setEntities } from '@datorama/akita';
import { GridDataItem } from './grid-data-item.model';
import { Injectable } from '@angular/core';

export interface GridDataItemsState extends EntityState<GridDataItem> { }

// const initialState = {
//   collection: []
// };

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'gridDataItems' })
export class GridDataItemsStore extends EntityStore<GridDataItemsState, GridDataItem> {

  constructor() {
    super();

    this.set([
      { id: 1, name: 'name 2.1', count: 210 },
      { id: 2, name: 'name 3.1', count: 310 }
    ]);
  }
}
