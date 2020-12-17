import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardConComponent } from './dashboard-con.component';

describe('DashboardConComponent', () => {
  let component: DashboardConComponent;
  let fixture: ComponentFixture<DashboardConComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardConComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardConComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
