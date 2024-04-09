import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule as PrimeNgButtonModule } from 'primeng/button';
import { DropdownModule as PrimeNgDropdownModule } from 'primeng/dropdown';
import { PanelModule as PrimeNgPanelModule } from 'primeng/panel';
import { ProgressSpinnerModule as PrimeNgProgressSpinnerModule } from 'primeng/progressspinner';
import { SelectButtonModule as PrimeNgSelectButtonModule } from 'primeng/selectbutton';
import { TagModule as PrimeNgTagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import {
  EntityDetailsViewComponent
} from '@libs/entities/feature-list/src/lib/entity-details-view/entity-details-view.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [EntityDetailsViewComponent],
  imports: [
    CommonModule,
    PrimeNgButtonModule,
    PrimeNgDropdownModule,
    PrimeNgPanelModule,
    PrimeNgProgressSpinnerModule,
    PrimeNgSelectButtonModule,
    PrimeNgTagModule,
    ReactiveFormsModule,
    RouterModule,
  ]
})
export class EntityDetailsViewModule {}
