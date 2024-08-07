import {ApiResponse} from '@Models/Response';

export interface TeacherInsertRequest {
    Nombre: string;
    ApPaterno: string;
    ApMaterno: string;
    Direccion: string;
}

export interface TeacherUpdateRequest {
    Id: number;
    Nombre: string;
    ApPaterno: string;
    ApMaterno: string;
    Direccion: string;
}

export type GetProfesoresResponse = ApiResponse<ProfesorModel[]>;

export interface ProfesorModel {
    Id: number;
    Nombre: string;
    ApPaterno: string;
    ApMaterno: string;
    Direccion:string;
    Estatus: string;
    UsuarioRegistra: string;
    FechaRegistro:string;
}
