import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityMockService } from './services/entity-mock.service';
import { EntityService } from './services/entity.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: EntityService,
      useClass: EntityMockService
    }
  ]
})
export class EntitiesDataRepositoryModule {}
