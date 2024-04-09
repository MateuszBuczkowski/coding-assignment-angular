import { Injectable } from '@angular/core';
import { EntityListItem, GetEntityListParams } from '@libs/entities/data-repository/src/lib/model/model';
import { MessageService as PrimeNgMessageService } from 'primeng/api';
import { EntityService } from '@libs/entities/data-repository/src/lib/services/entity.service';
import { BehaviorSubject, Observable, take } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EntitiesListService {
  public isEntitiesListDataLoading$: Observable<boolean> = new Observable<boolean>();
  public entitiesList: EntityListItem[] = [];

  private _isEntitiesListDataLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private _entityService: EntityService,
    private _primeNgMessageService: PrimeNgMessageService
  ) {
    this.isEntitiesListDataLoading$ = this._isEntitiesListDataLoadingSubject.asObservable();
  }

  public getEntitiesList(getEntityListParams: GetEntityListParams): void {
    this._isEntitiesListDataLoadingSubject.next(true);
    this._entityService.getEntityList(getEntityListParams)
      .pipe(take(1))
      .subscribe({
        next: (value: EntityListItem[]) => {
          this.handleGetEntityListResponseData(value)
        },
        error: err => this.handleGetEntityListResponseError(err.error)
      });
  }

  public handleGetEntityListResponseData(entityList: EntityListItem[]): void {
    this.entitiesList = entityList;
    this._isEntitiesListDataLoadingSubject.next(false);
  }

  public handleGetEntityListResponseError(error: any): void {
    this.showServerErrorToast();
    this._isEntitiesListDataLoadingSubject.next(false);
  }

  public showServerErrorToast() {
    this._primeNgMessageService.add({key: 'errorToast', severity: 'error', summary:  'Error', detail: 'Unable to load entity list' });
  }
}
