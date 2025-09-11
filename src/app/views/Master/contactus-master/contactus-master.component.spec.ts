import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactusMasterComponent } from './contactus-master.component';

describe('ContactusMasterComponent', () => {
  let component: ContactusMasterComponent;
  let fixture: ComponentFixture<ContactusMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactusMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactusMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
