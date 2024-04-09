import { Route } from '@angular/router';
import { EntitiesListComponent } from '@libs/entities/feature-list/src/lib/entities-list/entities-list.component';
import {
  EntityDetailsViewComponent
} from '@libs/entities/feature-list/src/lib/entity-details-view/entity-details-view.component';
import {
  EntityDetailsEditComponent
} from '@libs/entities/feature-list/src/lib/entity-details-edit/entity-details-edit.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'entities/homepage',
  },
  {
    path: 'entities/homepage',
    component: EntitiesListComponent
  },
  {
    path: 'entity/entities-list',
    loadChildren: () => import('@libs/entities/feature-list/src/lib/entities-feature-list.module')
      .then(m => m.EntitiesFeatureListModule)
  },
  {
    path: 'entity/entities-list/:entityId/view',
    component: EntityDetailsViewComponent
  },
  {
    path: 'entity/entities-list/:entityId/edit',
    component: EntityDetailsEditComponent
  },
  {
    path: 'dashboards/location',
    loadChildren: () => import('@libs/entities/feature-location-dashboard/src/lib/entities-feature-location-dashboard.module')
      .then(m => m.EntitiesFeatureLocationDashboardModule)
  },
];
