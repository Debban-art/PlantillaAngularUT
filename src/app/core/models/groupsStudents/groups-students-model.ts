import { ApiResponse } from "@Models/Response";

export interface GroupsStudentsInsertRequest {
    IdGrupo: number;
    Matricula: string;
}

export interface GroupsStudentsUpdateRequest{
    Id: number;
    IdGrupo: number;
    Matricula: string;
}

export type GetGruposAlumnosResponse = ApiResponse<GruposAlumnosModel[]>

export interface GruposAlumnosModel {
    Id: number;
    Grupo: string;
    Matricula: string;
    Alumno: string;
    Estatus: string;
    UsuarioRegistra: string;
    FechaRegistro: string;
}
