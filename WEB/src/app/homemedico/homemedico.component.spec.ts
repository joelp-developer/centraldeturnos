import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomemedicoComponent } from './homemedico.component';

describe('HomemedicoComponent', () => {
  let component: HomemedicoComponent;
  let fixture: ComponentFixture<HomemedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomemedicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomemedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
