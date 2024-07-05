import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../services/pedidos.service';
import { Pedido } from '../models/pedido';

@Component({
  selector: 'app-pedidos-list',
  templateUrl: './pedidos-list.component.html',
  styleUrls: ['./pedidos-list.component.scss']
})
export class PedidosListComponent implements OnInit {
  pedidos: Pedido[] = [];

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.pedidoService.getPedidos().subscribe((data: Pedido[]) => {
      this.pedidos = data;
    });
  }
}
