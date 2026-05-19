import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FinanceDashboardComponent } from './finance-dashboard.component';

describe('FinanceDashboardComponent', () => {
  let component: FinanceDashboardComponent;
  let fixture: ComponentFixture<FinanceDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceDashboardComponent, NoopAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
