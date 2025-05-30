import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareGuideCreateComponent } from './care-guide-create.component';

describe('CareGuideCreateComponent', () => {
  let component: CareGuideCreateComponent;
  let fixture: ComponentFixture<CareGuideCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareGuideCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareGuideCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
