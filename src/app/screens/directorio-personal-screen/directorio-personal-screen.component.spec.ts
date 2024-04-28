import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorioPersonalScreenComponent } from './directorio-personal-screen.component';

describe('DirectorioPersonalScreenComponent', () => {
  let component: DirectorioPersonalScreenComponent;
  let fixture: ComponentFixture<DirectorioPersonalScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DirectorioPersonalScreenComponent]
    });
    fixture = TestBed.createComponent(DirectorioPersonalScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
