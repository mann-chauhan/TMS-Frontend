import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceDecisionHistoryComponent } from './finance-decision-history.component';

describe('FinanceDecisionHistoryComponent', () => {
  let component: FinanceDecisionHistoryComponent;
  let fixture: ComponentFixture<FinanceDecisionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceDecisionHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceDecisionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
