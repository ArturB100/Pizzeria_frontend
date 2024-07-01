import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaImgComponent } from './pizza-img.component';

describe('PizzaImgComponent', () => {
  let component: PizzaImgComponent;
  let fixture: ComponentFixture<PizzaImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaImgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
