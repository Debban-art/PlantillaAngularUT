
import {ApiResponse} from '@Models/Response';

export interface MajorInserRequest{
    NombreCarrera: string;
    Abreviatura: string;
}

export interface MajorUpdateRequest{
    Id: number;
    NombreCarrera: string;
    Abreviatura: string;
}

export type GetCarrerasResponse = ApiResponse<CarreraModel[]>;

export interface CarreraModel {
    Id: number;
    NombreCarrera: string;
    Abreviatura: string;
    Estatus: string;
    UsuarioRegistra: string;
    FechaRegistro: string;
}
