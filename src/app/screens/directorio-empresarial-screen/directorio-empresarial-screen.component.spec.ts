import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorioEmpresarialScreenComponent } from './directorio-empresarial-screen.component';

describe('DirectorioEmpresarialScreenComponent', () => {
  let component: DirectorioEmpresarialScreenComponent;
  let fixture: ComponentFixture<DirectorioEmpresarialScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DirectorioEmpresarialScreenComponent]
    });
    fixture = TestBed.createComponent(DirectorioEmpresarialScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
