import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EntitiesListComponent } from './entities-list/entities-list.component';
import { EntitiesDataRepositoryModule } from '@libs/entities/data-repository/src';
import { InputTextModule as PrimeNgInputTextModule } from 'primeng/inputtext';
import { MultiSelectModule as PrimeNgMultiSelectModule } from 'primeng/multiselect';
import { ProgressSpinnerModule as PrimeNgProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule as PrimeNgTableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: EntitiesListComponent },
];

@NgModule({
  imports: [
    CommonModule,
    EntitiesDataRepositoryModule,
    FormsModule,
    PrimeNgInputTextModule,
    PrimeNgMultiSelectModule,
    PrimeNgProgressSpinnerModule,
    PrimeNgTableModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [EntitiesListComponent],
  exports: [
    EntitiesListComponent,
    RouterModule
  ]
})
export class EntitiesFeatureListModule {}
