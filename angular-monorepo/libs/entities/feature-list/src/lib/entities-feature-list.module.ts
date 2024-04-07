import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EntitiesListComponent } from './entities-list/entities-list.component';
import { EntitiesDataRepositoryModule } from '@libs/entities/data-repository/src';

const routes: Routes = [
  { path: '', component: EntitiesListComponent },
];

@NgModule({
  imports: [
    CommonModule,
    EntitiesDataRepositoryModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EntitiesListComponent],
  exports: [
    EntitiesListComponent,
    RouterModule
  ],
})
export class EntitiesFeatureListModule {}
