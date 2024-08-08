import { ApiResponse } from "@Models/Response";

export interface GroupsSubjectsInsertRequest {
    IdGrupo: number;
    IdMateria: number;
}

export interface GroupsSubjectsUpdateRequest{
    Id: number;
    IdGrupo: number;
    IdMateria: number;
}

export type GetGruposMateriasResponse = ApiResponse<GruposMateriasModel[]>

export interface GruposMateriasModel {
    Id: number;
    Grupo: string;
    Materia: string;
    Carrera: string;
    Estatus: string;
    UsuarioRegistra: string;
    FechaRegistro: string;
}
