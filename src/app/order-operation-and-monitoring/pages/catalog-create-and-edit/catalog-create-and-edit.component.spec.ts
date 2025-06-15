import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogCreateAndEditComponent } from './catalog-create-and-edit.component';

describe('CatalogCreateAndEditComponent', () => {
  let component: CatalogCreateAndEditComponent;
  let fixture: ComponentFixture<CatalogCreateAndEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogCreateAndEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogCreateAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
