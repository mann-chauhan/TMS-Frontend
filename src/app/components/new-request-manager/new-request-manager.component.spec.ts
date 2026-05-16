import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRequestManagerComponent } from './new-request-manager.component';

describe('NewRequestManagerComponent', () => {
  let component: NewRequestManagerComponent;
  let fixture: ComponentFixture<NewRequestManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewRequestManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRequestManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
