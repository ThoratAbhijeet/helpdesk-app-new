import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateTicketComponent } from './add-update-ticket.component';

describe('AddUpdateTicketComponent', () => {
  let component: AddUpdateTicketComponent;
  let fixture: ComponentFixture<AddUpdateTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUpdateTicketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUpdateTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
