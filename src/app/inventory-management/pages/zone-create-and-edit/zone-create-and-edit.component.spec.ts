import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneCreateAndEditComponent } from './zone-create-and-edit.component';

describe('ZoneCreateAndEditComponent', () => {
  let component: ZoneCreateAndEditComponent;
  let fixture: ComponentFixture<ZoneCreateAndEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZoneCreateAndEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZoneCreateAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
