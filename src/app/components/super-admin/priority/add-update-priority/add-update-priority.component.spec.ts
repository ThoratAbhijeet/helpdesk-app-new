import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdatePriorityComponent } from './add-update-priority.component';

describe('AddUpdatePriorityComponent', () => {
  let component: AddUpdatePriorityComponent;
  let fixture: ComponentFixture<AddUpdatePriorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUpdatePriorityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUpdatePriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
