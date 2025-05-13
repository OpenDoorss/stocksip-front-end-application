import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareGuideListComponent } from './care-guide-list.component';

describe('CareGuideListComponent', () => {
  let component: CareGuideListComponent;
  let fixture: ComponentFixture<CareGuideListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareGuideListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareGuideListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
