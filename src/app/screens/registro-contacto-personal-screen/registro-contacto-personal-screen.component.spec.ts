import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroContactoPersonalScreenComponent } from './registro-contacto-personal-screen.component';

describe('RegistroContactoPersonalScreenComponent', () => {
  let component: RegistroContactoPersonalScreenComponent;
  let fixture: ComponentFixture<RegistroContactoPersonalScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroContactoPersonalScreenComponent]
    });
    fixture = TestBed.createComponent(RegistroContactoPersonalScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
