// import { Component, OnInit } from '@angular/core'
// import { PersistNgFormPlugin } from '@datorama/akita'
// import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager'
// import { UntilDestroy } from '@ngneat/until-destroy'
// import { AssetsService, SharedAppDataService } from '@pim/common/core'
// import { RxFormBuilder, RxFormGroup } from '@rxweb/reactive-form-validators'
// import {
//   Entry, EntryQuery, EntryStore, EntryStoreService, IEntry, IEntryFormState
// } from '../../model/input.model'

// @UntilDestroy( { checkProperties: true } )
// @Component(
//   {
//     selector: 'pim-nhncd-mat-input',
//     providers: [EntryStore, EntryQuery, EntryStoreService],
//     template: `
//       <form
//           *ngIf = 'form'
//           [formGroup] = 'form'
//           autocomplete = 'off'
//           class = 'mrg-botm-15px'
//           fxLayout = 'row'>

//         <mat-form-field
//             fxFlex = 'auto'>

//           <input #input
//                  matInput
//                  appearance = 'standard'
//                  formControlName = 'entry'
//                  placeholder = 'Entry'>
//         </mat-form-field>
//       </form>
//     `,
//     styles: []
//   } )
// export class NhncdMatInputComponent
//   implements OnInit {
//   form: RxFormGroup

//   private _pngfp: PersistNgFormPlugin
//   ctrl

//   constructor(
//     protected assets: AssetsService,
//     private _fb: RxFormBuilder,
//     private _mngr: AkitaNgFormsManager<IEntryFormState>,
//     private _query: EntryQuery,
//     private _srvc: EntryStoreService,
//     public store: SharedAppDataService,
//     private _store: EntryStore ) {

//   }

//   ngOnInit() {
//     this.form = this._fb.formGroup( Entry ) as RxFormGroup

//     const storeName = this._store.storeName as 'entry'

//     this._mngr.upsert( storeName, this.form,
//                        { debounceTime: 30 } )

//     this._mngr.selectDirty( storeName, 'entry' )
//         .subscribe( dirty => console.log( 'dirty: ', dirty ) )

//     // NOTICE:
//     // * 2nd parameter: if string - gets init values from state,
//     //   if function - gets init values from object returned from that function
//     this._pngfp =
//       new PersistNgFormPlugin( this._query, this.createMatInput ).setForm( this.form )

//     this._mngr.selectControl( storeName, 'entry' )
//         .subscribe( ctrl => this.ctrl = ctrl )
//   }

//   createMatInput(): IEntry {
//     return { entry: '' }
//   }
// }