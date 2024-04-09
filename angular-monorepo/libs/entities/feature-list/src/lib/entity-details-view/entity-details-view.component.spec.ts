import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  EntityDetailsViewComponent
} from '@libs/entities/feature-list/src/lib/entity-details-view/entity-details-view.component';

describe('EntityDetailsViewComponent', () => {
  let component: EntityDetailsViewComponent;
  let fixture: ComponentFixture<EntityDetailsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityDetailsViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EntityDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
