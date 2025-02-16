import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeSuccessPopupComponent } from './trade-success-popup.component';

describe('TradeSuccessPopupComponent', () => {
  let component: TradeSuccessPopupComponent;
  let fixture: ComponentFixture<TradeSuccessPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TradeSuccessPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeSuccessPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
