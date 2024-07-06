import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { InsumoService } from '../services/insumo.service';
import { Pedido } from '../models/pedido';
import { Product } from '../models/product';
import { Insumo } from '../models/insumo';
import { PedidoService } from '../services/pedidos.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  productos: { [key: number]: Product } = {};
  insumos: { [key: number]: Insumo } = {};
  insumosVisible: { [key: number]: boolean } = {};
  isUser: boolean = false;

  constructor(
    private pedidoService: PedidoService,
    private productService: ProductService,
    private insumoService: InsumoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if(this.authService.isAuthenticated() && this.authService.getUserRole() === 'USER'){
      this.isUser = true;
      this.loadInsumosUser();
    }
    else{
      this.loadInsumos();
    }
  }

  loadInsumosUser(): void {
    this.insumoService.getInsumosActivos().subscribe(insumos => {
      insumos.forEach(insumo => {
        this.insumos[insumo.id] = insumo;
      });
      console.log('Insumos cargados:', this.insumos);  // Debug
      this.loadPedidosUser();
    }, error => {
      console.error('Error al cargar todos los insumos:', error);  // Debug
    });
  }

  loadInsumos(): void {
    this.insumoService.getInsumosActivos().subscribe(insumos => {
      insumos.forEach(insumo => {
        this.insumos[insumo.id] = insumo;
      });
      console.log('Insumos cargados:', this.insumos);  // Debug
      this.loadPedidos();
    }, error => {
      console.error('Error al cargar todos los insumos:', error);  // Debug
    });
  }

  loadPedidosUser(): void {
    this.pedidoService.getPedidosByUserId(Number(localStorage.getItem('id'))).subscribe(pedidos => {
      this.pedidos = pedidos;
      console.log('Pedidos cargados:', this.pedidos);  // Debug
      this.loadProductos();
    });
  }

  loadPedidos(): void {
    this.pedidoService.getPedidos().subscribe(pedidos => {
      this.pedidos = pedidos;
      console.log('Pedidos cargados:', this.pedidos);  // Debug
      this.loadProductos();
    });
  }

  loadProductos(): void {
    const productIds = new Set<number>();
    this.pedidos.forEach(pedido => {
      pedido.productos.forEach(item => productIds.add(item.productoId));
    });

    productIds.forEach(id => {
      this.productService.getProductoById(id).subscribe(producto => {
        this.productos[id] = producto;
        console.log('Producto cargado:', producto);  // Debug
        this.assignInsumosToProduct(producto);
      });
    });
  }

  assignInsumosToProduct(product: Product): void {
    if (product && product.insumos) {
      product.insumos.forEach(pi => {
        const insumo = this.insumos[pi.insumoId];        
        if (insumo) {
          pi.insumoId = Number(insumo.id);
        } else {
          console.warn(`Insumo con ID ${pi.insumoId} no encontrado para el producto ${product.nombre}`);
        }
      });
      console.log('Producto con insumos asignados:', product);  // Debug
    } else {
      console.error('Error: producto o productoInsumos no definidos');
    }
  }

  cambiarEstadoPedido(pedido: Pedido): void {
    if (pedido.estado === 'Pendiente') {
      pedido.estado = 'En preparacion';
    } else if (pedido.estado === 'En preparacion') {
      pedido.estado = 'Listo para recoger';
    }

    this.pedidoService.updatePedido(pedido).subscribe(
      updatedPedido => {
        console.log('Pedido actualizado:', updatedPedido);
      },
      error => {
        console.error('Error al actualizar el pedido:', error);
      }
    );
  }
}
