import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionChooseComponent } from './subscription-choose.component';

describe('SubscriptionChooseComponent', () => {
  let component: SubscriptionChooseComponent;
  let fixture: ComponentFixture<SubscriptionChooseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionChooseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
