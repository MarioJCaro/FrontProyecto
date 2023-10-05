import { CategoriasItemMenu } from "../enums/categoria-item-menu.enum";

export interface ItemMenu{
    id:number;
    nombre:string;
    descripcion:string;
    categoria: CategoriasItemMenu;
    precio:number;
    imagen: string;
    activo: boolean;

}