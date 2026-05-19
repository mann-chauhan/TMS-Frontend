import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FinanceApprovalCenterComponent } from './finance-show-request.component';

describe('FinanceApprovalCenterComponent', () => {
  let component: FinanceApprovalCenterComponent;
  let fixture: ComponentFixture<FinanceApprovalCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceApprovalCenterComponent, NoopAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceApprovalCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
