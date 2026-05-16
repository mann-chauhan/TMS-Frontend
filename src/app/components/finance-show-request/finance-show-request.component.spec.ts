import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceShowRequestComponent } from './finance-show-request.component';

describe('FinanceShowRequestComponent', () => {
  let component: FinanceShowRequestComponent;
  let fixture: ComponentFixture<FinanceShowRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceShowRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceShowRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
