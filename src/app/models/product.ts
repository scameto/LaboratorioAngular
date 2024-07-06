import { ProductoInsumo } from "./producto-insumo";

export class Product {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  precio: number;
  insumos: ProductoInsumo[];  

  borrado: boolean;

  constructor(id: number, nombre: string, descripcion: string, imagen: string, precio: number, productoInsumos: ProductoInsumo[]) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.imagen = imagen;
    this.precio = precio;
    this.insumos = productoInsumos;
    this.borrado = false;
  }
}
