import { ProductoInsumo } from "./producto-insumo";

export class Product {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  precio: number;
  productoInsumos: ProductoInsumo[];
  Borrado: Boolean;

  constructor(id: number, nombre: string, descripcion: string, imagen: string, precio: number, productoInsumos: ProductoInsumo[]) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.imagen = imagen;
    this.precio = precio;
    this.productoInsumos = productoInsumos;
    this.Borrado = false;
  }
}
