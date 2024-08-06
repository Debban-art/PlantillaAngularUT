import {ApiResponse} from '@Models/Response';

//Modelo para insertar una nueva persona
export interface PersonInsertRequest {
    Nombre: string;
    ApPaterno: string;
    ApMaterno: string;
    Direccion: string;
}

//Modelo para actualizar los datos de una persona
export interface PersonUpdateRequest {
    Id: number;
    Nombre: string;
    ApPaterno: string;
    ApMaterno: string;
    Direccion: string;
}

export type GetPersonasResponse = ApiResponse<PersonaModel[]>;

// interface GetPersonasResponseData {
//     persons: PersonaModel[];
// }

export interface PersonaModel {
    Id: number;
    Nombre: string;
    ApPaterno: string;
    ApMaterno: string;
    Direccion:string;
    Estatus: string;
    UsuarioRegistra: string;
    FechaRegistro:string;
}