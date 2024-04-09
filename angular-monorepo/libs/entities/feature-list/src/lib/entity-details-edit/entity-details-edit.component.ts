import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  ValidationErrors, ValidatorFn,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  EntityDetails,
  EntityListItem,
  EntityType,
  EntityUpdateDto
} from '@libs/entities/data-repository/src/lib/model/model';
import { EntityService } from '@libs/entities/data-repository/src/lib/services/entity.service';
import { MessageService as PrimeNgMessageService } from 'primeng/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, map, Observable, of } from 'rxjs';

@Component({
  selector: 'angular-monorepo-entity-details-edit',
  templateUrl: './entity-details-edit.component.html',
  styleUrls: ['./entity-details-edit.component.scss'],
})
export class EntityDetailsEditComponent implements OnInit {
  public entityId: string = '';
  public entityDetails!: EntityDetails;
  public isLoading: boolean = false;
  public isSaving: boolean = false;

  public entityDetailsForm = this._formBuilder.group({
    entityId: new FormControl(''),
    trackingId: new FormControl('', {
      validators: [this.validateNameNotEqualTrackingId()]
    }),
    name: new FormControl('',{
      validators: [Validators.required, this.validateNameNotEqualTrackingId()],
      asyncValidators: [this.validateNameUniqueness()]}),
    entityType: new FormControl('',[Validators.required]),
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
    private _primeNgMessageService: PrimeNgMessageService,
    private _router: Router,
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

  public onSave(): void {
    this.isSaving = true;
    this.entityDetailsForm.markAllAsTouched();
    if (this.entityDetailsForm.invalid) {
      this.isSaving = false;
      return;
    }
    const entityUpdateDto: EntityUpdateDto = {
      trackingId: this.entityDetailsForm.controls['trackingId'].value ? this.entityDetailsForm.controls['trackingId'].value : '',
      name: this.entityDetailsForm.controls['name'].value ? this.entityDetailsForm.controls['name'].value : '',
      entityType: this.entityDetailsForm.controls['entityType'].value ? this.entityDetailsForm.controls['entityType'].value : '',
    }
    this._entityService.updateEntity(entityUpdateDto, this.entityId).pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next: (data: EntityDetails) => {
        this.isSaving = false;
        this._router.navigate([`/entity/entities-list/${this.entityId}/view`]);
      },
      error: err => {
        this.isSaving = false;
        this._router.navigate(['/entity/entities-list/']);
      }
    });
  }

  public validateNameNotEqualTrackingId(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.entityDetailsForm?.get('trackingId')?.value === this.entityDetailsForm?.get('name')?.value) {
        return { nameEqualsTrackingId: true };
      } else {
        return null;
      }
    }
  }

  public validateNameUniqueness(): AsyncValidatorFn {
    console.log('validateNameUniqueness');
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return this._entityService.getEntityList({ name: control.value }).pipe(map(
        (entityListItems: EntityListItem[]) => {
          return (entityListItems && entityListItems.length > 0) ? { "nameExists": true } : null;
        }
      ));
    };
  }
}
