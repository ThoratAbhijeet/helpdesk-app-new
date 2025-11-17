import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopmentDashboardComponent } from './development-dashboard.component';

describe('DevelopmentDashboardComponent', () => {
  let component: DevelopmentDashboardComponent;
  let fixture: ComponentFixture<DevelopmentDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevelopmentDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevelopmentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
