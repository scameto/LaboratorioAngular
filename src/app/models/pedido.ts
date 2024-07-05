export class Pedido {
    id: number;
    fechaPedido: Date;
    fechaEntrega: Date;
    estado: string;
    userId: number;
    productos: { productoId: number, cantidad: number }[];

    constructor(id:number, fechaPedido:Date, fechaEntrega:Date, estado:string, userId:number, productos: {productoId:number, cantidad:number}[]){
        this.id = id;
        this.fechaPedido = fechaPedido;
        this.fechaEntrega = fechaEntrega;
        this.estado = estado;
        this.userId = userId;
        this.productos = productos;
    }


}
