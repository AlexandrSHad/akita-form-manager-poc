// import { Injectable } from '@angular/core'
// import { guid, Query, Store } from '@datorama/akita'
// import { prop } from '@rxweb/reactive-form-validators'

// export interface IEntryFormState {
//   entry: string
// }

// export class EntryFormState{
//   entry: IEntry
// }

// export interface IEntry {
//   entry: string
// }

// export class Entry {
//   @prop() entry: string
// }

// @Injectable()
// export class EntryStore extends Store<IEntry> {
//   constructor() {
//     super( { entry: '' }, { name: `mat-input-${guid()}` } )
//   }

// }

// @Injectable()
// export class EntryQuery extends Query<IEntry> {
//   constructor( protected store: EntryStore ) {
//     super( store )
//   }
// }

// @Injectable()
// export class EntryStoreService {
//   constructor( private _store: EntryStore ) {}

//   get storeName(): string {
//     return this._store.storeName
//   }

//   updateInput( input: string ) {
// //    this._store.update( state => ({
// //      entry
// //    }) )
//   }
// }