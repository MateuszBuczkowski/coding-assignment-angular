import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EntitiesListComponent } from './entities-list/entities-list.component';

const routes: Routes = [
  { path: '', component: EntitiesListComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EntitiesListComponent],
  exports: [
    EntitiesListComponent,
    RouterModule
  ],
})
export class EntitiesFeatureListModule {}
