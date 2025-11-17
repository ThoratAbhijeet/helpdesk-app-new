import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPriorityComponent } from './view-priority.component';

describe('ViewPriorityComponent', () => {
  let component: ViewPriorityComponent;
  let fixture: ComponentFixture<ViewPriorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewPriorityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewPriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
