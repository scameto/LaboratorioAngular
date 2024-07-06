import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosCardComponent } from './pedidos-card.component';

describe('PedidosCardComponent', () => {
  let component: PedidosCardComponent;
  let fixture: ComponentFixture<PedidosCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PedidosCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PedidosCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
