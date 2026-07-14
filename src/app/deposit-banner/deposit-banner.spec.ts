import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositBanner } from './deposit-banner';

describe('DepositBanner', () => {
  let component: DepositBanner;
  let fixture: ComponentFixture<DepositBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepositBanner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositBanner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
