import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarPopupComponent } from './eliminar-popup.component';

describe('EliminarPopupComponent', () => {
  let component: EliminarPopupComponent;
  let fixture: ComponentFixture<EliminarPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
