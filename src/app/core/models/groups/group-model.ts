import { ApiResponse } from "@Models/Response";

export interface GroupInsertRequest {
    Nombre: string;
    Clave: string;
}

export interface GroupUpdateRequest{
    Id: number;
    Nombre: string;
    Clave: string;
}

export type GetGruposResponse = ApiResponse<GrupoModel[]>

export interface GrupoModel {
    Id: number;
    Nombre: string;
    Clave: string;
    Estatus: string;
    UsuarioRegistra: string;
    FechaRegistro: string;
}