import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopmentSidebarComponent } from './development-sidebar.component';

describe('DevelopmentSidebarComponent', () => {
  let component: DevelopmentSidebarComponent;
  let fixture: ComponentFixture<DevelopmentSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevelopmentSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevelopmentSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
