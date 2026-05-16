import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponentTwo } from './login-two.component';

describe('LoginTwoComponent', () => {
  let component: LoginComponentTwo;
  let fixture: ComponentFixture<LoginComponentTwo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponentTwo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponentTwo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
