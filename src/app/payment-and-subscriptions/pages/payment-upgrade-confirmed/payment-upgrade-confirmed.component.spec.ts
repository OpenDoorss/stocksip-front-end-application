import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentUpgradeConfirmedComponent } from './payment-upgrade-confirmed.component';

describe('PaymentUpgradeConfirmedComponent', () => {
  let component: PaymentUpgradeConfirmedComponent;
  let fixture: ComponentFixture<PaymentUpgradeConfirmedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentUpgradeConfirmedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentUpgradeConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
