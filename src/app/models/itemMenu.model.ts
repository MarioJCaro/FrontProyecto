import { CategoriasItemMenu } from "../enums/categoria-item-menu.enum";
import { Grupo } from "./grupo.model";

export interface ItemMenu{
    id:number;
    nombre:string;
    descripcion:string;
    categoria: Grupo;
    precio:number;
    imagen: string;
    activo: boolean;

}