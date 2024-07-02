import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../services/pedidos.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { InsumoService } from '../services/insumo.service';

interface Insumo {
  nombre: string;
  unidad_medida: string;
  cantidadTotal: number;
}

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  pedidos: any[] = [];
  pedidosFiltrados: any[] = [];
  usuario: any;
  modoMisPedidos: boolean = false;
  insumosVisibles: { [key: string]: boolean } = {};
  insumos: any[] = [];
  totalInsumos: any[] = [];
  mostrarInsumos: boolean = false;



  filtros = {
    estado: '',
    fechaDesde: '',
    fechaHasta: '',
    cliente: ''
  };

  constructor(
    private pedidoService: PedidoService,
    private userService: UserService,
    private route: ActivatedRoute,
    private insumoService: InsumoService,


  ) {}


  ngOnInit() {
    this.usuario = this.userService.getUsuarioAutenticado();
    this.modoMisPedidos = this.route.snapshot.data['modo'] === 'mis-pedidos';
    this.cargarInsumos();
    this.cargarPedidos();
  }

  cargarPedidos() {
    this.pedidos = this.pedidoService.obtenerPedidos();
    if (this.modoMisPedidos) {
      this.pedidosFiltrados = this.pedidos.filter(p => p.usuario && p.usuario.email === this.usuario.email);
    } else {
      this.filtrarPedidos();
    }
    this.calcularTotalInsumos();
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

  actualizarEstado(pedido: any, nuevoEstado: string): void {
    pedido.estado = nuevoEstado;
    this.pedidoService.actualizarPedido(pedido); 
    this.cargarPedidos();
  }
  
  limpiarFiltros() {
    this.filtros = {
      estado: '',
      fechaDesde: '',
      fechaHasta: '',
      cliente: ''
    };
    this.cargarPedidos();
    //this.eliminarTodosLosPedidos();
  }

  cargarInsumos() {
    this.insumoService.getInsumos().subscribe(insumos => {
      this.insumos = insumos;
      console.log(this.insumos); 

    });
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

  toggleInsumos(pedidoId: number, articuloId: number) {
    const key = this.getInsumosKey(pedidoId, articuloId);
    this.insumosVisibles[key] = !this.insumosVisibles[key];
  }

  getInsumosKey(pedidoId: number, articuloId: number): string {
    return `${pedidoId}-${articuloId}`;
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
  
  calcularTotalInsumos() {
    const total: { [key: string]: any } = {};

    this.pedidosFiltrados.forEach(pedido => {
      pedido.articulos.forEach((articulo: any) => {
        this.calcularInsumos(articulo).forEach((insumo: Insumo) => {
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

  toggleMostrarInsumos() {
    this.filtrarPedidos();
    this.mostrarInsumos = !this.mostrarInsumos;
  }

  getEstadoTexto(estado: string): string {
    switch (estado) {
      case 'pendiente':
        return 'PENDIENTE';
      case 'enPreparacion':
        return 'EN PREPARACION';
      case 'listoParaRetirar':
        return 'LISTO !!!';
      default:
        return '';
    }
  }



  eliminarTodosLosPedidos() {
    localStorage.removeItem('pedidos');
  }

}
