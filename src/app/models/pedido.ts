export class Pedido {
    id: number;
    fechaPedido: string;
    fechaEntrega: string;
    estado: string;
    userId: number;
    productos: { productoId: number, cantidad: number }[];

    constructor(id: number, fechaPedido: Date, fechaEntrega: Date, estado: string, userId: number, productos: { productoId: number, cantidad: number }[]) {
        this.id = id;
        this.fechaPedido = this.formatFecha(fechaPedido);
        this.fechaEntrega = this.formatFecha(fechaEntrega);
        this.estado = estado;
        this.userId = userId;
        this.productos = productos;
    }

    private formatFecha(date: Date): string {
        return date.toISOString().split('T')[0];
    }
}
