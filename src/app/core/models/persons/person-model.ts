import {ApiResponse} from '@Models/Response';

export interface PersonInsertRequest {
    Nombre: string;
    ApPaterno: string;
    ApMaterno: string;
    Direccion: string;
}

export type GetPersonasResponse = ApiResponse<GetPersonasResponseData>;

interface GetPersonasResponseData {
    data: PersonaModel[];
}
export interface PersonaModel {
    Id: number;
    Nombre: string;
    ApPaterno: string;
    ApMaterno: string;
    Direccion: string;
    Estatus: string;
    UsuarioRegistra: string;
    FechaRegistro: string;
}