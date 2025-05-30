import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareGuideEditComponent } from './care-guide-edit.component';

describe('CareGuideEditComponent', () => {
  let component: CareGuideEditComponent;
  let fixture: ComponentFixture<CareGuideEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareGuideEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareGuideEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
