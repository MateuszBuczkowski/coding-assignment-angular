import { Route } from '@angular/router';
import { EntitiesListComponent } from '@libs/entities/feature-list/src/lib/entities-list/entities-list.component';

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
    path: 'dashboards/location',
    loadChildren: () => import('@libs/entities/feature-location-dashboard/src/lib/entities-feature-location-dashboard.module')
      .then(m => m.EntitiesFeatureLocationDashboardModule)
  },
];
