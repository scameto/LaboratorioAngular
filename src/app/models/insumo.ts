export class Insumo {
    id: number;
    nombre: string;
    descripcion: string;
    unidad_medida: string;
  
    constructor(id: number, nombre: string, descripcion: string, unidad_medida: string) {
      this.id = id;
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.unidad_medida = unidad_medida;
    }
}
