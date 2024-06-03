export class Product {
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
    precio: number;
  
    constructor(id: number, nombre: string, descripcion: string, imagen: string, precio: number) {
      this.id = id;
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.imagen = imagen;
      this.precio = precio;
    }
  }