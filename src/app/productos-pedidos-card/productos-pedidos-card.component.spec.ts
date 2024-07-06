import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosPedidosCardComponent } from './productos-pedidos-card.component';

describe('ProductosPedidosCardComponent', () => {
  let component: ProductosPedidosCardComponent;
  let fixture: ComponentFixture<ProductosPedidosCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductosPedidosCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductosPedidosCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
