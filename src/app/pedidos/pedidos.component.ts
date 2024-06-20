import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../services/pedidos.service'; // Asegúrate de tener este servicio


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  pedidos: any[] = [];

  constructor(private pedidoService: PedidoService) {}


  ngOnInit() {
    this.cargarPedidos();
  }

  cargarPedidos() {
    this.pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
  }

  actualizarEstado(pedido: any, nuevoEstado: string): void {
    pedido.estado = nuevoEstado;
    this.pedidoService.actualizarPedido(pedido); 
  }
}
