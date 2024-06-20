import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  obtenerPedidos() {
    return JSON.parse(localStorage.getItem('pedidos') || '[]');
  }

  actualizarPedido(pedidoActualizado: any) {
    const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
    const index = pedidos.findIndex((pedido: any) => pedido.fechaPedido === pedidoActualizado.fechaPedido && pedido.fechaRetiro === pedidoActualizado.fechaRetiro);
    if (index !== -1) {
      pedidos[index] = pedidoActualizado;
      localStorage.setItem('pedidos', JSON.stringify(pedidos));
    }
  }
}
