import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EntitiesListComponent } from './entities-list/entities-list.component';
import { EntitiesDataRepositoryModule } from '@libs/entities/data-repository/src';
import { ButtonModule as PrimeNgButtonModule } from 'primeng/button';
import { SelectButtonModule as PrimeNgSelectButtonModule } from 'primeng/selectbutton';
import { InputSwitchModule as PrimeNgInputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule as PrimeNgInputTextModule } from 'primeng/inputtext';
import { MultiSelectModule as PrimeNgMultiSelectModule } from 'primeng/multiselect';
import { ProgressSpinnerModule as PrimeNgProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule as PrimeNgTableModule } from 'primeng/table';
import { ToastModule as PrimeNgToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  EntityDetailsViewModule
} from '@libs/entities/feature-list/src/lib/entity-details-view/entity-details-view-module';
import {
  EntityDetailsEditModule
} from '@libs/entities/feature-list/src/lib/entity-details-edit/entity-details-edit-module';

const routes: Routes = [
  { path: '', component: EntitiesListComponent },
];
@NgModule({
  imports: [
    CommonModule,
    EntityDetailsEditModule,
    EntityDetailsViewModule,
    EntitiesDataRepositoryModule,
    FormsModule,
    PrimeNgButtonModule,
    PrimeNgInputSwitchModule,
    PrimeNgInputTextModule,
    PrimeNgMultiSelectModule,
    PrimeNgProgressSpinnerModule,
    PrimeNgSelectButtonModule,
    PrimeNgTableModule,
    PrimeNgToastModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    EntitiesListComponent
  ],
  exports: [
    EntitiesListComponent,
    RouterModule
  ]
})
export class EntitiesFeatureListModule {}
