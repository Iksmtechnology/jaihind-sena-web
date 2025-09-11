import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutusMasterComponent } from './aboutus-master.component';

describe('AboutusMasterComponent', () => {
  let component: AboutusMasterComponent;
  let fixture: ComponentFixture<AboutusMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutusMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutusMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
