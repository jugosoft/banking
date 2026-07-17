import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestBanner } from './invest-banner';

describe('InvestBanner', () => {
  let component: InvestBanner;
  let fixture: ComponentFixture<InvestBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestBanner]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InvestBanner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
