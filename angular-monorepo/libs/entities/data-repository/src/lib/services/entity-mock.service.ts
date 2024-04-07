import { Injectable } from '@angular/core';
import {
  Employee, EmployeeVisits,
  EntityDetails,
  EntityListItem,
  EntityType,
  EntityUpdateDto,
  GetEntityListParams,
  LocationStats
} from '../model/model';
import { delay, Observable, Observer } from 'rxjs';
import { EntityService } from './entity.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class EntityMockService extends EntityService {

  private _apiResponseDelay = 1000;
  private _apiResponseErrorProbability = 0; // 100 = 100%, 10 = 10%, etc.

  private _entities: EntityListItem[] = [
    {
      entityId: '1',
      trackingId: 'ab:cd:ef:5d:7a',
      name: 'Entity 1',
      entityType: 'n1t',
      entityStatus: 'On Duty',
      isActive: true,
    },
    {
      entityId: '2',
      trackingId: 'ac:cd:ef:4d:7a',
      name: 'Entity 2',
      entityType: 'n1t',
      entityStatus: 'Break',
      isActive: true,
    },
    {
      entityId: '3',
      trackingId: 'af:cd:ef:5d:8a',
      name: 'Entity 3',
      entityType: 'n2t',
      entityStatus: 'On Duty',
      isActive: true,
    },
    {
      entityId: '4',
      trackingId: 'af:cf:ef:5d:9a',
      name: 'Entity 4',
      entityType: 'n2t',
      entityStatus: 'Break',
      isActive: false,
    }
  ];

  private _entitiesDetails: EntityDetails[] = [
    {
      entityId: '1',
      trackingId: 'ab:cd:ef:5d:7a',
      name: 'Entity 1',
      entityType: 'n1t',
      entityStatus: 'On Duty',
      isActive: true,
      attributes: ['Department1', 'Fast Responder', 'xyakf83kfdasf930-fksdf0239-12303-46340129394', 'Morning Shift'],
    },
    {
      entityId: '2',
      trackingId: 'ac:cd:ef:4d:7a',
      name: 'Entity 2',
      entityType: 'n1t',
      entityStatus: 'Break',
      isActive: true,
      attributes: ['Department1', 'Fast Responder', 'xyakf83kfdasf930-fksdf0239-12303-46340129394', 'Morning Shift'],
    },
    {
      entityId: '3',
      trackingId: 'af:cd:ef:5d:8a',
      name: 'Entity 3',
      entityType: 'n2t',
      entityStatus: 'On Duty',
      isActive: true,
      attributes: ['Department1', 'Fast Responder', 'xyakf83kfdasf930-fksdf0239-12303-46340129394', 'Morning Shift'],
    },
    {
      entityId: '4',
      trackingId: 'af:cf:ef:5d:9a',
      name: 'Entity 4',
      entityType: 'n2t',
      entityStatus: 'Break',
      isActive: false,
      attributes: ['Department1', 'Fast Responder', 'xyakf83kfdasf930-fksdf0239-12303-46340129394', 'Morning Shift'],
    }
  ];

  private _entityTypes: EntityType[] = [
    {id: 'n1t', name: 'Nurse'},
    {id: 'n2t', name: 'Security'}
  ];

  private _lastWeekLocationOccupancy: number[] = [40, 245, 235, 182, 143, 120, 20];

  private _lastWeekVisitsLog: Employee[] = [
    {id: 'id1', name: 'Jacob Holland'},
    {id: 'id1', name: 'Jacob Holland'},
    {id: 'id2', name: 'Charles Bradley'},
    {id: 'id3', name: 'Mason Moore'},
    {id: 'id4', name: 'Alice Kelly'},
    {id: 'id3', name: 'Mason Moore'},
    {id: 'id1', name: 'Jacob Holland'},
    {id: 'id2', name: 'Charles Bradley'},
    {id: 'id3', name: 'Mason Moore'},
    {id: 'id4', name: 'Alice Kelly'},
    {id: 'id3', name: 'Mason Moore'},
    {id: 'id1', name: 'Jacob Holland'},
    {id: 'id2', name: 'Charles Bradley'},
    {id: 'id3', name: 'Mason Moore'},
    {id: 'id4', name: 'Alice Kelly'},
    {id: 'id3', name: 'Mason Moore'},
    {id: 'id1', name: 'Jacob Holland'},
    {id: 'id2', name: 'Charles Bradley'},
    {id: 'id3', name: 'Mason Moore'},
    {id: 'id4', name: 'Alice Kelly'},
    {id: 'id3', name: 'Mason Moore'},
    {id: 'id1', name: 'Jacob Holland'},
    {id: 'id2', name: 'Charles Bradley'},
    {id: 'id1', name: 'Jacob Holland'},
    {id: 'id2', name: 'Charles Bradley'},
    {id: 'id1', name: 'Jacob Holland'},
    {id: 'id2', name: 'Charles Bradley'},
    {id: 'id1', name: 'Jacob Holland'},
    {id: 'id2', name: 'Charles Bradley'},
    {id: 'id1', name: 'Jacob Holland'},
    {id: 'id2', name: 'Charles Bradley'},
    {id: 'id3', name: 'Mason Moore'},
    {id: 'id4', name: 'Alice Kelly'},
    {id: 'id3', name: 'Mason Moore'},
    {id: 'id4', name: 'Alice Kelly'},
    {id: 'id3', name: 'Mason Moore'},
    {id: 'id4', name: 'Alice Kelly'},
    {id: 'id3', name: 'Mason Moore'},
    {id: 'id4', name: 'Alice Kelly'},
    {id: 'id5', name: 'Rachel Gray'},
    {id: 'id6', name: 'Alexis Morales'},
    {id: 'id1', name: 'Jacob Holland'},
    {id: 'id1', name: 'Jacob Holland'},
  ];

  override getEntityList(getEntityListParams: GetEntityListParams): Observable<EntityListItem[] | HttpErrorResponse> {
    if (this._showErrorResponse()) {
      return this._httpRequestForbiddenErrorResponse();
    } else {
      return new Observable((observer: Observer<EntityListItem[]>) => {
        observer.next(this._entities);
        observer.complete();
      }).pipe(delay(this._apiResponseDelay));
    }
  }

  override getEntityDetails(entityId: string): Observable<EntityDetails | HttpErrorResponse> {
    if (this._showErrorResponse()) {
      return this._httpRequestForbiddenErrorResponse();
    } else {
      return new Observable((observer: Observer<EntityDetails>) => {
        const entityDetailsIndex: number = this._entitiesDetails.findIndex((entityDetails: EntityDetails): boolean => {
          return entityDetails.entityId === entityId;
        });
        if (entityDetailsIndex >= 0) {
          observer.next(this._entitiesDetails[entityDetailsIndex]);
        } else {
          observer.next({
            entityId: '',
            trackingId: '',
            name: '',
            entityType: '',
            entityStatus: '',
            isActive: false,
            attributes: [],
          });
        }
        observer.complete();
      }).pipe(delay(this._apiResponseDelay));
    }
  }

  override updateEntity(entityUpdateDto: EntityUpdateDto, entityId: string): Observable<EntityDetails | HttpErrorResponse> {
    if (this._showErrorResponse()) {
      return this._httpRequestForbiddenErrorResponse();
    } else {
      return new Observable((observer: Observer<EntityDetails>) => {
        observer.next({
          entityId: '',
          trackingId: '',
          name: '',
          entityType: '',
          entityStatus: '',
          isActive: false,
          attributes: [],
        });
        observer.complete();
      }).pipe(delay(this._apiResponseDelay));
    }
  }

  override getEntityTypes(): Observable<EntityType[] | HttpErrorResponse> {
    if (this._showErrorResponse()) {
      return this._httpRequestForbiddenErrorResponse();
    } else {
      return new Observable((observer: Observer<EntityType[]>) => {
        observer.next(this._entityTypes);
        observer.complete();
      }).pipe(delay(this._apiResponseDelay));
    }
  }

  override getLocationStats(): Observable<LocationStats | HttpErrorResponse> {
    if (this._showErrorResponse()) {
      return this._httpRequestForbiddenErrorResponse();
    } else {
      return new Observable((observer: Observer<LocationStats>) => {
        observer.next({
          lastWeekLocationOccupancy: this._lastWeekLocationOccupancy,
          lastWeekEmployeesVisits: this._getLastWeekEmployeesVisits(),
        });
        observer.complete();
      }).pipe(delay(this._apiResponseDelay));
    }
  }

  private _getLastWeekEmployeesVisits(): EmployeeVisits[] {
    return Object.values<EmployeeVisits>(this._lastWeekVisitsLog.reduce<Record<string, EmployeeVisits>>(
      function(visits: Record<string, EmployeeVisits>, employee: Employee) {
      if (visits[employee.id]) {
        visits[employee.id].visits++;
      } else {
        visits[employee.id] = { name: employee.name, visits: 1 };
      }
      return visits;
    }, {}));
  }

  private _showErrorResponse(): boolean {
    return Math.random() * 100 <= this._apiResponseErrorProbability;
  }

  private _httpRequestForbiddenErrorResponse(): Observable<HttpErrorResponse> {
    throw new HttpErrorResponse({
      error: 'Forbidden',
      status: 403
    })
  }
}
