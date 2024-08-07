import { ApiResponse } from "@Models/Response";

export interface SubjectInsertRequest {
    NombreMateria: string;
    ClaveMateria: string;
    IdCarrera: number;
}

export interface SubjectUpdateRequest{
    Id: number;
    NombreMateria: string;
    ClaveMateria: string;
    IdCarerra: number;
}

export type GetMateriasResponse = ApiResponse<MateriaModel[]>

export interface MateriaModel {
    Id: number;
    NombreMateria: string;
    ClaveMateria: string;
    ClaveCarrera: string;
    Estatus: string;
    UsuarioRegistra: string;
    FechaRegistro: string;
}
