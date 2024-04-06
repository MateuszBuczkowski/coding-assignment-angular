import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntitiesLocationDashboardComponent } from './entities-location-dashboard.component';

describe('HomepageComponent', () => {
  let component: EntitiesLocationDashboardComponent;
  let fixture: ComponentFixture<EntitiesLocationDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntitiesLocationDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EntitiesLocationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
