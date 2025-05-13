import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCreateAndEditComponent } from './report-create-and-edit.component';

describe('ReportCreateAndEditComponent', () => {
  let component: ReportCreateAndEditComponent;
  let fixture: ComponentFixture<ReportCreateAndEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportCreateAndEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportCreateAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
