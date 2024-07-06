import { Component, Input } from '@angular/core';
import { Insumo } from '../models/insumo';
import { Product } from '../models/product';

@Component({
  selector: 'app-productos-pedidos-card',
  templateUrl: './productos-pedidos-card.component.html',
  styleUrl: './productos-pedidos-card.component.scss'
})
export class ProductosPedidosCardComponent {
  @Input() insumos!: { [key: number]: Insumo };
  @Input() producto!: Product;
  @Input() cantidad!: number;
  @Input() esUsuario!: boolean;
  insumosVisible = false;

  toggleInsumos(): void {
    this.insumosVisible = !this.insumosVisible;
  }
}
