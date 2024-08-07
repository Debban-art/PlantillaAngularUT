import { ApiResponse } from "@Models/Response";

export interface StudentInsertRequest {
    Matricula: string;
    Nombre: string;
    ApPaterno: string;
    ApMaterno: string;
    Direccion: string;
}

export interface StudentUpdateRequest {
    Id: number;
    Matricula: string;
    Nombre: string;
    ApPaterno: string;
    ApMaterno: string;
    Direccion: string;
}

export type GetStudentsResponse = ApiResponse<StudentModel[]>;

export interface StudentModel {
    Id: number;
    Matricula: string;
    Nombre: string;
    ApPaterno: string;
    ApMaterno: string;
    Direccion: string;
    Estatus: string;
    UsuarioRegistra: string;
    FechaRegistro:string;
}
