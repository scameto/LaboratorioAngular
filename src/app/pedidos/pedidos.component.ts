import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../services/pedidos.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { InsumoService } from '../services/insumo.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  pedidos: any[] = [];
  pedidosFiltrados: any[] = [];
  totalInsumos: any[] = [];
  filtros = {
    estado: '',
    fechaDesde: '',
    fechaHasta: '',
    cliente: ''
  };
  mostrarInsumos: boolean = false;
  insumosVisibles: { [key: string]: boolean } = {};
  modoMisPedidos: boolean = false;
  insumos: any[] = [];



  constructor(
    private pedidoService: PedidoService,
    private toastr: ToastrService,
    private userService: UserService,
    private insumoService: InsumoService,
    ) { }

  ngOnInit() {
    this.cargarInsumos();
    this.cargarPedidos();
  }

  cargarInsumos() {
    this.insumoService.getInsumos().subscribe(
      insumos => {
        this.insumos = insumos;
        this.cargarPedidos();  // Cargar los pedidos después de haber cargado los insumos
      },
      error => {
        this.toastr.error('Hubo un problema al cargar los insumos.');
      }
    );
  }
  

  cargarPedidos() {
    if (this.modoMisPedidos) {
      const userId = this.userService.getUsuarioAutenticado()?.id;
      if (userId) {
        this.pedidoService.getPedidosByUserId(userId).subscribe(
          pedidos => {
            this.pedidos = pedidos;
            this.pedidosFiltrados = pedidos;
          },
          error => {
            this.toastr.error('Hubo un problema al cargar los pedidos.');
          }
        );
      }
    } else {
      this.pedidoService.getPedidos().subscribe(
        pedidos => {
          this.pedidos = pedidos;
          this.pedidosFiltrados = pedidos;
        },
        error => {
          this.toastr.error('Hubo un problema al cargar los pedidos.');
        }
      );
    }
  }

  filtrarPedidos() {
    this.pedidosFiltrados = this.pedidos.filter(pedido => {
      const matchesEstado = this.filtros.estado ? pedido.estado === this.filtros.estado : true;
      const matchesFechaDesde = this.filtros.fechaDesde ? new Date(pedido.fechaRetiro) >= new Date(this.filtros.fechaDesde) : true;
      const matchesFechaHasta = this.filtros.fechaHasta ? new Date(pedido.fechaRetiro) <= new Date(this.filtros.fechaHasta) : true;
      const matchesCliente = this.filtros.cliente ? pedido.usuario && pedido.usuario.email.includes(this.filtros.cliente) : true;
      return matchesEstado && matchesFechaDesde && matchesFechaHasta && matchesCliente;
    });
    this.calcularTotalInsumos();
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

  toggleMostrarInsumos() {
    this.filtrarPedidos();
    this.mostrarInsumos = !this.mostrarInsumos;
  }

  toggleInsumos(pedidoId: number, productoId: number) {
    const key = this.getInsumosKey(pedidoId, productoId);
    this.insumosVisibles[key] = !this.insumosVisibles[key];
  }

  getInsumosKey(pedidoId: number, productoId: number) {
    return `${pedidoId}-${productoId}`;
  }

  calcularInsumos(articulo: any) {
    if (!articulo.producto.insumos || !Array.isArray(articulo.producto.insumos)) {
      return [];
    }
    return articulo.producto.insumos.map((insumo: any) => {
      const detalleInsumo = this.insumos.find(i => i.id === insumo.insumoId);
      if (!detalleInsumo) {
      }
      return {
        nombre: detalleInsumo ? detalleInsumo.nombre : 'Insumo desconocido',
        unidad_medida: detalleInsumo ? detalleInsumo.unidad_medida : '',
        cantidadTotal: insumo.cantidad * articulo.cantidad
      };
    });
  }

  calcularTotalInsumos() {
    const total: { [key: string]: any } = {};

    this.pedidosFiltrados.forEach(pedido => {
      pedido.articulos.forEach((articulo: any) => {
        this.calcularInsumos(articulo).forEach((insumo: any) => {
          if (!total[insumo.nombre]) {
            total[insumo.nombre] = {
              nombre: insumo.nombre,
              unidad_medida: insumo.unidad_medida,
              cantidadTotal: 0
            };
          }
          total[insumo.nombre].cantidadTotal += insumo.cantidadTotal;
        });
      });
    });

    this.totalInsumos = Object.values(total);
  }


  actualizarEstado(pedido: any, nuevoEstado: string) {
    pedido.estado = nuevoEstado;
    this.pedidoService.updatePedido(pedido).subscribe(
      response => {
        this.toastr.success('Estado del pedido actualizado con éxito.');
        this.filtrarPedidos();
      },
      error => {
        this.toastr.error('Hubo un problema al actualizar el estado del pedido.');
      }
    );
  }

  

  isUser(){
    return this.userService.getUsuarioAutenticado()?.role === 'USER' ;
  }

  isAdmin() {
    return this.userService.getUsuarioAutenticado()?.role === 'ADMIN';
  }

  isAuthenticated(){
    return this.userService.isAuthenticated();
  }

  getEstadoTexto(estado: string): string {
    switch (estado) {
      case 'pendiente': return 'Pendiente';
      case 'enPreparacion': return 'En Preparación';
      case 'listoParaRetirar': return 'Listo para Retirar';
      default: return estado;
    }
  }
}
