import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
  imports: [CommonModule],
  declarations: [HomepageComponent],
  exports: [HomepageComponent],
})
export class EntitiesFeatureHomepageModule {}
