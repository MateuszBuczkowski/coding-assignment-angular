import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {
  EntitiesLocationDashboardComponent
} from './entities-location-dashboard/entities-location-dashboard.component';
import { EntitiesDataRepositoryModule } from '@libs/entities/data-repository/src';

const routes: Routes = [
  { path: '', component: EntitiesLocationDashboardComponent },
];


@NgModule({
  imports: [
    CommonModule,
    EntitiesDataRepositoryModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EntitiesLocationDashboardComponent],
  exports: [
    EntitiesLocationDashboardComponent,
    RouterModule
  ],
})
export class EntitiesFeatureLocationDashboardModule {}
