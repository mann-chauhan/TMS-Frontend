import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountabilitiesComponent } from './show-accountabilities.component';

describe('ShowAccountabilitiesComponent', () => {
  let component: AccountabilitiesComponent;
  let fixture: ComponentFixture<AccountabilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountabilitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountabilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
