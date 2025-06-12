import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareGuideDashboardComponent } from './care-guide-dashboard.component';

describe('CareGuideDashboardComponent', () => {
  let component: CareGuideDashboardComponent;
  let fixture: ComponentFixture<CareGuideDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareGuideDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareGuideDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
