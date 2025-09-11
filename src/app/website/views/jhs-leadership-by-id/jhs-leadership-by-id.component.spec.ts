import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JhsLeadershipByIdComponent } from './jhs-leadership-by-id.component';

describe('JhsLeadershipByIdComponent', () => {
  let component: JhsLeadershipByIdComponent;
  let fixture: ComponentFixture<JhsLeadershipByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JhsLeadershipByIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JhsLeadershipByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
