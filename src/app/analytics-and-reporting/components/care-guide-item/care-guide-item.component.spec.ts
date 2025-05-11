import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareGuideItemComponent } from './care-guide-item.component';

describe('CareGuideItemComponent', () => {
  let component: CareGuideItemComponent;
  let fixture: ComponentFixture<CareGuideItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareGuideItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareGuideItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
