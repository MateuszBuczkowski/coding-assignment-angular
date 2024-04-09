import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EntitiesFeatureHomepageModule } from '@angular-monorepo/entities/feature-homepage';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { EntitiesDataRepositoryModule } from '@libs/entities/data-repository/src';
import { MessageService as PrimeNgMessageService } from 'primeng/api';
import { DialogService as PrimeNgDialogService } from 'primeng/dynamicdialog';
import { EntitiesListService } from '@libs/entities/feature-list/src/lib/services/entities-list.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AvatarGroupModule,
    AvatarModule,
    BadgeModule,
    BrowserAnimationsModule,
    BrowserModule,
    EntitiesDataRepositoryModule,
    EntitiesFeatureHomepageModule,
    PanelMenuModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [
    EntitiesListService,
    PrimeNgDialogService,
    PrimeNgMessageService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
