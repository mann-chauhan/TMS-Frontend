/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceProfileComponent } from './finance-profile.component';

describe('FinanceProfileComponent', () => {
  let component: FinanceProfileComponent;
  let fixture: ComponentFixture<FinanceProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with finance role', () => {
    expect(component.userProfile.fullName).toBe('Robert Johnson');
    expect(component.userProfile.role).toBe('Finance');
    expect(component.activeTab).toBe('overview');
  });

  it('should switch tabs correctly', () => {
    component.switchTab('personal');
    expect(component.activeTab).toBe('personal');
  });

  it('should return correct role color for finance', () => {
    expect(component.getRoleColor()).toBe('#f59e0b'); // Finance color
  });
});