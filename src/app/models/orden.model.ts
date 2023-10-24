import { Cliente } from "./cliente.model";
import { Empleado } from "./empleado.model";
import { ItemOrden } from "./itemOrden.model";
import { Mesa } from "./mesa.model";

export interface Orden {
    id: number;
    fecha: Date;
    hora: string;
    total: number;
    responsable: string;
    estado: string;
    ocupacion: number;
    observaciones: string;
    paga: boolean;
    clienteId: number;
    empleadoId: number;
    createdAt: Date,
    updatedAt: Date,
    items: ItemOrden[];
    mesas: Mesa[];
    cliente: Cliente;
    empleado: Empleado;
    itemNames: { [itemId: number]: string }; //objeto que mapea el ID del ítem a su nombre
    itemGroups: { [key: number]: string };  // nuevo campo para el grupo de cada ítem

  }