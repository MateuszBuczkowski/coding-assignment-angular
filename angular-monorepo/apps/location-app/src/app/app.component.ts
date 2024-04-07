import { Component } from '@angular/core';

@Component({
  selector: 'angular-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  title = 'location-app';

  items = [
    {
        label: 'Entities',
        icon: 'pi pi-fw pi-compass',
        items: [
          {
            label: 'Homepage',
            icon: 'pi pi-fw pi-bookmark',
            routerLink: 'entities/homepage'
          },
          {
              label: 'List',
              icon: 'pi pi-fw pi-entities-list',
              routerLink: 'entity/entities-list'
          },
        ]
    },
    {
        label: 'Dashboards',
        icon: 'pi pi-fw pi-chart-bar',
        items: [
            {
                label: 'Location Dashboard',
                icon: 'pi pi-fw pi-chart-line',
                routerLink: 'dashboards/location'
            },
        ]
    },
  ];

}
