import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistromedicoComponent } from './registromedico.component';

describe('RegistrodocComponent', () => {
  let component: RegistromedicoComponent;
  let fixture: ComponentFixture<RegistromedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistromedicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistromedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
