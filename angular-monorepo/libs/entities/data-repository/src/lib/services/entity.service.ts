import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { EntityDetails, EntityListItem, EntityType, EntityUpdateDto, GetEntityListParams, LocationStats } from "../model/model";
import { Observable, of } from 'rxjs';

@Injectable()
export class EntityService {

    getEntityList(getEntityListParams: GetEntityListParams): Observable<EntityListItem[] | HttpErrorResponse> {
        return of([]);
    }

    getEntityDetails(entityId: string): Observable<EntityDetails | HttpErrorResponse> {
        return of({
            entityId: '',
            trackingId: '',
            name: '',
            entityType: '',
            entityStatus: '',
            isActive: false,
            attributes: [],
        });
    }

    updateEntity(entityUpdateDto: EntityUpdateDto, entityId: string): Observable<EntityDetails | HttpErrorResponse> {
        return of({
            entityId: '',
            trackingId: '',
            name: '',
            entityType: '',
            entityStatus: '',
            isActive: false,
            attributes: [],
        });
    }

    getEntityTypes(): Observable<EntityType[] | HttpErrorResponse> {
        return of([]);
    }

    getLocationStats(): Observable<LocationStats | HttpErrorResponse> {
        return of({
            lastWeekLocationOccupancy: [],
            lastWeekEmployeesVisits: [],
        });
    }
}
