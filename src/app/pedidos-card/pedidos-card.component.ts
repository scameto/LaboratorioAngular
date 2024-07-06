import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { Pedido } from '../models/pedido';
import { Product } from '../models/product';
import { Insumo } from '../models/insumo';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-pedidos-card',
  templateUrl: './pedidos-card.component.html',
  styleUrl: './pedidos-card.component.scss'
})
export class PedidosCardComponent {
  @Input() pedido!: Pedido;
  @Input() productos!:  { [key: number]: Product };
  @Input() insumos!: { [key: number]: Insumo };
  @Input() isUser!: boolean;
  @Output() cambiarEstado = new EventEmitter<Pedido>();

  onCambiarEstadoPedido(): void {
    this.cambiarEstado.emit(this.pedido);
  }

}
