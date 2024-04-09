import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  EntityDetailsEditComponent
} from '@libs/entities/feature-list/src/lib/entity-details-edit/entity-details-edit.component';

describe('EntityDetailsEditComponent', () => {
  let component: EntityDetailsEditComponent;
  let fixture: ComponentFixture<EntityDetailsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityDetailsEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EntityDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
