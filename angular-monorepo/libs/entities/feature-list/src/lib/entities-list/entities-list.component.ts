import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GetEntityListParams } from '@libs/entities/data-repository/src/lib/model/model';
import {
  defaultEntitiesListTableColumnsConfiguration,
  EntitiesListTableColumnConfiguration
} from '@libs/entities/feature-list/src/lib/entities-list/interfaces/entities-list-table-columns-configuration.interface';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { EntitiesListService } from '@libs/entities/feature-list/src/lib/services/entities-list.service';

@Component({
  selector: 'angular-monorepo-entities-list',
  templateUrl: './entities-list.component.html',
  styleUrls: ['./entities-list.component.scss'],
})
export class EntitiesListComponent implements OnInit {
  public entitiesListTableSelectedColumns: { name: string }[] = [];
  public entitiesListTableColumnsOptions: { name: string }[] = [];
  public entitiesListTableColumnsConfiguration: EntitiesListTableColumnConfiguration[] = defaultEntitiesListTableColumnsConfiguration;
  public entitiesListTableSearchForm = this._formBuilder.group({
    entitySearch: '',
  });

  private _entitiesListTableVisibleColumnsLocalStorageKey: string = 'kontaktIoEntitiesListTableVisibleColumns';
  private _formAutoSubmitDebounceTimeInMs: number = 400;
  private _getEntitiesListParams: GetEntityListParams = {
    search: '',
    name: ''
  };

  constructor(
    public entitiesListService: EntitiesListService,
    private _formBuilder: FormBuilder
  ) {
  }

  public ngOnInit(): void {
    this.entitiesListService.getEntitiesList(this._getEntitiesListParams);
    this.setEntitiesListTableColumnsOptions();
    this.setInitialEntitiesListTableSelectedColumns();
    this.updateEntitiesListTableColumnsConfiguration();
    this.autoFilterEntitiesListTableOnSearchFormChange();
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
        this._getEntitiesListParams.search = value.entitySearch ? value.entitySearch : '';
        this.entitiesListService.getEntitiesList(this._getEntitiesListParams);
    });
  }

  private _getEntitiesListVisibleColumnsFromLocalStorage(): { name: string }[] {
    return JSON.parse(localStorage.getItem(this._entitiesListTableVisibleColumnsLocalStorageKey) || '[]');
  }

  private _saveEntitiesListVisibleColumnsToLocalStorage(): void {
    localStorage.setItem(this._entitiesListTableVisibleColumnsLocalStorageKey, JSON.stringify(this.entitiesListTableSelectedColumns));
  }
}
