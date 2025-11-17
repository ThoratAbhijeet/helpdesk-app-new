import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateTicketsComponent } from './add-update-tickets.component';

describe('AddUpdateTicketsComponent', () => {
  let component: AddUpdateTicketsComponent;
  let fixture: ComponentFixture<AddUpdateTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUpdateTicketsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUpdateTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
