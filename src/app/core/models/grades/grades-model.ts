import { ApiResponse } from "@Models/Response";

export interface GradeInsertRequest {
    Matricula: string;
    IdMateria: number;
    Periodo: number;
    Parcial: number;
    Calificacion: number;
}

export interface GradeUpdateRequest{
    Id: number;
    Matricula: string;
    IdMateria: number;
    Periodo: number;
    Parcial: number;
    Calificacion: number;
}

export type GetCalificacionesResponse = ApiResponse<CalificacionModel[]>

export interface CalificacionModel {
    Id: number;
    Matricula: string;
    NombreAlumno: string;
    Materia: string;
    Periodo: number;
    Parcial: number;
    Calificacion: number;
    Estatus: string;
    UsuarioRegistra: string;
    FechaRegistro: string;
}
