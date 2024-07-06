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
  esUsuario: boolean = false;
  modoMisPedidos: boolean = false;
  filtros = {
    estado: '',
    fechaDesde: '',
    fechaHasta: '',
    cliente: ''
  };
  pedidosFiltrados: Pedido[] = [];
  pedidosMostrando: Pedido[] = [];
  mostrarInsumos: boolean = false;
  totalInsumos: { [key: number]: number } = {};
  currentPage: number = 1;
  pageSize: number = 6;
  totalItems: number = 0;
  totalPages: number = 0;

  constructor(
    private pedidoService: PedidoService,
    private productService: ProductService,
    private insumoService: InsumoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated() && this.authService.getUserRole() === 'USER') {
      this.esUsuario = true;
      this.loadInsumosUser();
    } else {
      this.loadInsumos();
    }
  }

  loadInsumosUser(): void {
    this.insumoService.getInsumosActivos().subscribe(insumos => {
      insumos.forEach(insumo => {
        this.insumos[insumo.id] = insumo;
      });
      this.loadPedidosUser();
    }, error => {
      console.error('Error al cargar todos los insumos:', error);
    });
  }

  toggleMostrarInsumos() {
    if (!this.mostrarInsumos) {
      this.totalInsumos = this.calculateTotalInsumos();
    }
    this.mostrarInsumos = !this.mostrarInsumos;
  }

  getInsumoIds(): number[] {
    return Object.keys(this.totalInsumos).map(id => Number(id));
  }

  limpiarFiltros() {
    this.filtros = {
      estado: '',
      fechaDesde: '',
      fechaHasta: '',
      cliente: ''
    };
    this.filtrarPedidos();
  }

  filtrarPedidos() {
    this.pedidosFiltrados = this.pedidos.filter(pedido => {
      const matchesEstado = this.filtros.estado ? pedido.estado === this.filtros.estado : true;
      const matchesFechaDesde = this.filtros.fechaDesde ? new Date(pedido.fechaEntrega) >= new Date(this.filtros.fechaDesde) : true;
      const matchesFechaHasta = this.filtros.fechaHasta ? new Date(pedido.fechaEntrega) <= new Date(this.filtros.fechaHasta) : true;
      return matchesEstado && matchesFechaDesde && matchesFechaHasta;
    });
    this.currentPage = 1;
    this.updatePagination();
  }

  loadInsumos(): void {
    this.insumoService.getInsumosActivos().subscribe(insumos => {
      insumos.forEach(insumo => {
        this.insumos[insumo.id] = insumo;
      });
      this.loadPedidos();
    }, error => {
      console.error('Error al cargar todos los insumos:', error);
    });
  }

  loadPedidosUser(): void {
    this.pedidoService.getPedidosByUserId(Number(localStorage.getItem('id'))).subscribe(pedidos => {
      this.pedidos = pedidos;
      this.loadProductos();
      this.pedidosFiltrados = pedidos; // Inicializar pedidosFiltrados con todos los pedidos cargados
      this.updatePagination();
    });
  }

  loadPedidos(): void {
    this.pedidoService.getPedidos().subscribe(pedidos => {
      this.pedidos = pedidos;
      this.loadProductos();
      this.pedidosFiltrados = pedidos; // Inicializar pedidosFiltrados con todos los pedidos cargados
      this.updatePagination();
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
        this.assignInsumosToProduct(producto);
      });
    });
  }

  isUser() {
    return this.authService.getUserRole() === 'USER';
  }

  isAdmin() {
    return this.authService.getUserRole() === 'ADMIN';
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
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

  calculateTotalInsumos(): { [key: number]: number } {
    const totalInsumos: { [key: number]: number } = {};

    this.pedidosMostrando.forEach(pedido => {
      pedido.productos.forEach((item: any) => {
        const product = this.productos[item.productoId];
        if (product && product.insumos) {
          product.insumos.forEach(pi => {
            if (totalInsumos[pi.insumoId]) {
              totalInsumos[pi.insumoId] += pi.cantidad * item.cantidad;
            } else {
              totalInsumos[pi.insumoId] = pi.cantidad * item.cantidad;
            }
          });
        }
      });
    });

    return totalInsumos;
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  updatePagination(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pedidosMostrando = this.pedidosFiltrados.slice(start, end);
    this.totalItems = this.pedidosFiltrados.length;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  }

  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
