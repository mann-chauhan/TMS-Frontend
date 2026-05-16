import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsibilitiesComponent} from './responsibilities.component';

describe('ResponsibilitiesComponent', () => {
  let component:ResponsibilitiesComponent;
  let fixture: ComponentFixture<ResponsibilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponsibilitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsibilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
