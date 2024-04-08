import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder } from '@angular/forms';
import { EntityService } from '@libs/entities/data-repository/src/lib/services/entity.service';
import { EntityListItem, GetEntityListParams } from '@libs/entities/data-repository/src/lib/model/model';
import { MessageService as PrimeNgMessageService } from 'primeng/api';
import {
  defaultEntitiesListTableColumnsConfiguration,
  EntitiesListTableColumnConfiguration
} from '@libs/entities/feature-list/src/lib/entities-list/interfaces/entities-list-table-columns-configuration.interface';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'angular-monorepo-entities-list',
  templateUrl: './entities-list.component.html',
  styleUrls: ['./entities-list.component.scss'],
})
export class EntitiesListComponent implements OnInit {
  public entitiesList: EntityListItem[] = [];
  public entitiesListTableSelectedColumns: { name: string }[] = [];
  public entitiesListTableColumnsOptions: { name: string }[] = [];
  public entitiesListTableColumnsConfiguration: EntitiesListTableColumnConfiguration[] = defaultEntitiesListTableColumnsConfiguration;
  public entitiesListTableSearchForm = this._formBuilder.group({
    entitySearch: [''],
  });
  public showGetEntityListError: boolean = false;
  public isLoading: boolean = false;

  private _destroyRef: DestroyRef = inject(DestroyRef);
  private _entitiesListTableVisibleColumnsLocalStorageKey: string = 'kontaktIoEntitiesListTableVisibleColumns';
  private _formAutoSubmitDebounceTimeInMs: number = 400;
  private _getEntitiesListParams!: GetEntityListParams;

  constructor(
    private _entityService: EntityService,
    private _formBuilder: FormBuilder,
    private _primeNgMessageService: PrimeNgMessageService
  ) {
  }

  public ngOnInit(): void {
    this.setIsInLoadingState(true);
    this.getEntitiesList();
    this.setEntitiesListTableColumnsOptions();
    this.setInitialEntitiesListTableSelectedColumns();
    this.updateEntitiesListTableColumnsConfiguration();
    this.autoFilterEntitiesListTableOnSearchFormChange();
  }

  public setIsInLoadingState(isLoading: boolean): void {
    this.isLoading = isLoading;
  }

  public getEntitiesList(): void {
    this._entityService.getEntityList(this._getEntitiesListParams)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (value: EntityListItem[]) => {
          this.handleGetEntityListResponseData(value)
        },
        error: err => this.handleGetEntityListResponseError(err.error)
      });
  }

  public handleGetEntityListResponseData(entityList: EntityListItem[]): void {
    this.entitiesList = entityList;
    this.setIsInLoadingState(false);
  }

  public handleGetEntityListResponseError(error: any): void {
    this.setIsInLoadingState(false);
    this.showGetEntityListError = true;
    this.showServerErrorToast();
  }

  public showServerErrorToast() {
    this._primeNgMessageService.add({key: 'errorToast', severity: 'error', summary:  'Error', detail: 'Unable to load entity list' });
  }

  public saveEntitiesListVisibleColumns(): void {
    this.updateEntitiesListTableColumnsConfiguration();
    this._saveEntitiesListVisibleColumnsToLocalStorage();
  }

  public updateEntitiesListTableColumnsConfiguration(): void {
    this.entitiesListTableColumnsConfiguration.forEach((column: EntitiesListTableColumnConfiguration) => {
      const matchingSelectedColumnIndex: number = this.entitiesListTableSelectedColumns.findIndex((selectedColumn: { name: string }) => {
        return selectedColumn.name === column.columnName;
      });
      column.isVisible = matchingSelectedColumnIndex >= 0;
    });
  }

  public setEntitiesListTableColumnsOptions(): void {
    this.entitiesListTableColumnsOptions.length = 0;
    defaultEntitiesListTableColumnsConfiguration.forEach((column: EntitiesListTableColumnConfiguration) => {
      if (column.canUserSetVisibility) {
        this.entitiesListTableColumnsOptions.push({ name: column.columnName });
      }
    });
  }

  public setInitialEntitiesListTableSelectedColumns(): void {
    if (localStorage.getItem(this._entitiesListTableVisibleColumnsLocalStorageKey)) {
      this.entitiesListTableSelectedColumns = this._getEntitiesListVisibleColumnsFromLocalStorage();
    } else {
      this.entitiesListTableSelectedColumns = [...this.entitiesListTableColumnsOptions];
    }
  }

  public autoFilterEntitiesListTableOnSearchFormChange(): void {
    this.entitiesListTableSearchForm.valueChanges
      .pipe(
        debounceTime(this._formAutoSubmitDebounceTimeInMs),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.setIsInLoadingState(true);
        this.getEntitiesList();
    });
  }

  public onEntityClick(): void {
    // TODO show Feature Entity Details
  }

  private _getEntitiesListVisibleColumnsFromLocalStorage(): { name: string }[] {
    return JSON.parse(localStorage.getItem(this._entitiesListTableVisibleColumnsLocalStorageKey) || '[]');
  }

  private _saveEntitiesListVisibleColumnsToLocalStorage(): void {
    localStorage.setItem(this._entitiesListTableVisibleColumnsLocalStorageKey, JSON.stringify(this.entitiesListTableSelectedColumns));
  }
}
