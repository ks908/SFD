import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SfdSharedModule } from '../../shared';
import {
  OperationDatService,
  OperationDatPopupService,
  OperationDatComponent,
  OperationDatDetailComponent,
  OperationDatDialogComponent,
  OperationDatPopupComponent,
  OperationDatDeletePopupComponent,
  OperationDatDeleteDialogComponent,
  OperationDatRoute,
  OperationDatPopupRoute
} from '.';
import { ProduitService } from '../produit';
import { NationalityService } from '../nationality';
import { TypeClientService } from '../type-client';
import { ProfessionService } from '../profession';
import { CaisseNouvelleService } from '../caisse-nouvelle';

const ENTITY_STATES = [...OperationDatRoute, ...OperationDatPopupRoute];

@NgModule({
  imports: [SfdSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    OperationDatComponent,
    OperationDatDetailComponent,
    OperationDatDialogComponent,
    OperationDatDeleteDialogComponent,
    OperationDatPopupComponent,
    OperationDatDeletePopupComponent
  ],
  entryComponents: [
    OperationDatComponent,
    OperationDatDialogComponent,
    OperationDatPopupComponent,
    OperationDatDeleteDialogComponent,
    OperationDatDeletePopupComponent
  ],
  providers: [
    OperationDatService,
    OperationDatPopupService,
    ProduitService,
    NationalityService,
    ProfessionService,
    TypeClientService,
    CaisseNouvelleService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SfdOperationDatModule { }