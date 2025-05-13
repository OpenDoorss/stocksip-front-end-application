import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentChooseComponent } from './payment-choose.component';

describe('PaymentChooseComponent', () => {
  let component: PaymentChooseComponent;
  let fixture: ComponentFixture<PaymentChooseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentChooseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
