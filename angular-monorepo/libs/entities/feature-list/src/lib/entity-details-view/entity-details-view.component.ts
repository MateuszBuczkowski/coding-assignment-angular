import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EntityDetails, EntityType } from '@libs/entities/data-repository/src/lib/model/model';
import { MessageService as PrimeNgMessageService } from 'primeng/api';
import { EntityService } from '@libs/entities/data-repository/src/lib/services/entity.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'angular-monorepo-entity-details-view',
  templateUrl: './entity-details-view.component.html',
  styleUrls: ['./entity-details-view.component.scss'],
})
export class EntityDetailsViewComponent implements OnInit {
  public entityId: string = '';
  public entityDetails!: EntityDetails;
  public isLoading: boolean = false;

  public entityDetailsForm = this._formBuilder.group({
    entityId: new FormControl(''),
    trackingId: new FormControl(''),
    name: new FormControl(''),
    entityType: new FormControl({value: '', disabled: true}),
    entityStatus: new FormControl({value: '', disabled: true}),
    isActive: new FormControl({value: false, disabled: true})
  });

  public entityTypeOptions: EntityType[] = [];

  public entityStatusOptions: { label: string, value: string }[] = [
    { label: 'Break', value: 'Break' },
    { label: 'On Duty', value: 'On Duty' }
  ];

  public isActiveOptions: { label: string, value: boolean }[] = [
    { label: 'Active', value: true },
    { label: 'Inactive', value: false }
  ];

  private _destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _entityService: EntityService,
    private _formBuilder: FormBuilder,
    private _primeNgMessageService: PrimeNgMessageService
  ) {
    this.entityId = this._activatedRoute.snapshot.params['entityId'];
  }

  public ngOnInit(): void {
    this.isLoading = true;
    this.getEntityDetails(this.entityId);
  }

  public getEntityDetails(entityId: string): void {
    combineLatest(this._entityService.getEntityDetails(entityId),
      this._entityService.getEntityTypes()
    ).pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next: (data: [EntityDetails, EntityType[]]) => {
        this.handleGetEntityDetailsResponseData(data[0]);
        this.handleGetEntityTypesResponseData(data[1]);
        this.isLoading = false;
      },
      error: err => this.handleGetEntityDetailsResponseError(err.error)
    });
  }

  public handleGetEntityDetailsResponseData(entityDetails: EntityDetails): void {
    this.entityDetails = entityDetails;
    this.entityDetailsForm.setValue({
      entityId: this.entityDetails.entityId,
      trackingId: this.entityDetails.trackingId ? this.entityDetails.trackingId : '',
      name: this.entityDetails.name,
      entityType: this.entityDetails.entityType ? this.entityDetails.entityType: '',
      entityStatus: this.entityDetails.entityStatus ? this.entityDetails.entityStatus: '',
      isActive: this.entityDetails.isActive ? this.entityDetails.isActive : false
    });
  }

  public handleGetEntityTypesResponseData(entityTypes: EntityType[]): void {
    this.entityTypeOptions = entityTypes;
  }

  public handleGetEntityDetailsResponseError(error: any): void {
    this._primeNgMessageService.add({key: 'errorToast', severity: 'error', summary:  'Error', detail: 'Unable to load entity details' });
    this.isLoading = false;
  }
}
