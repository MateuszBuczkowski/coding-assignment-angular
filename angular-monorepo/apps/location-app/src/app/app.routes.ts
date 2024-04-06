import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'entity/entities-list',
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
