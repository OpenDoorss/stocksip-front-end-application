import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogForOrdersComponent } from './catalog-for-orders.component';

describe('CatalogForOrdersComponent', () => {
  let component: CatalogForOrdersComponent;
  let fixture: ComponentFixture<CatalogForOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogForOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogForOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
