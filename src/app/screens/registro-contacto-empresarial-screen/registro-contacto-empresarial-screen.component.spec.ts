import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroContactoEmpresarialScreenComponent } from './registro-contacto-empresarial-screen.component';

describe('RegistroContactoEmpresarialScreenComponent', () => {
  let component: RegistroContactoEmpresarialScreenComponent;
  let fixture: ComponentFixture<RegistroContactoEmpresarialScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroContactoEmpresarialScreenComponent]
    });
    fixture = TestBed.createComponent(RegistroContactoEmpresarialScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
