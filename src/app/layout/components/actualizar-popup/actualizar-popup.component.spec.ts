import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarPopupComponent } from './actualizar-popup.component';

describe('ActualizarPopupComponent', () => {
  let component: ActualizarPopupComponent;
  let fixture: ComponentFixture<ActualizarPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
