import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutusDrawerComponent } from './aboutus-drawer.component';

describe('AboutusDrawerComponent', () => {
  let component: AboutusDrawerComponent;
  let fixture: ComponentFixture<AboutusDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutusDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutusDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
