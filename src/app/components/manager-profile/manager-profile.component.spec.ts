/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerProfileComponent } from './manager-profile.component';

describe('ManagerProfileComponent', () => {
  let component: ManagerProfileComponent;
  let fixture: ComponentFixture<ManagerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with manager role', () => {
    expect(component.userProfile.fullName).toBe('Jane Smith');
    expect(component.userProfile.role).toBe('Manager');
    expect(component.activeTab).toBe('overview');
  });

  it('should switch tabs correctly', () => {
    component.switchTab('personal');
    expect(component.activeTab).toBe('personal');
  });

  it('should return correct role color for manager', () => {
    expect(component.getRoleColor()).toBe('#3b82f6'); // Manager color
  });
});