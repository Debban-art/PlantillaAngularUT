import { environment } from './../../environments/environment';

export const auth = {
  login: `${environment.urlBase}SignIn`,
};

export const persons = {
  get: `${environment.urlBase}GetPersonas`,
  insert: `${environment.urlBase}InsertPersonas`,
};

export const profiles = {
  get: `${environment.urlBase}GetPerfiles`
};

export const stores = {
  get: `${environment.urlBase}GetSucursales`
};