import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareGuideCreateAndEditComponent } from './care-guide-create-and-edit.component';

describe('CareGuideCreateAndEditComponent', () => {
  let component: CareGuideCreateAndEditComponent;
  let fixture: ComponentFixture<CareGuideCreateAndEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareGuideCreateAndEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareGuideCreateAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
