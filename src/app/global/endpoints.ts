import { environment } from './../../environments/environment';

export const auth = {
  login: `${environment.urlBase}SignIn`,
};

export const persons = {
  get: `${environment.urlBase}GetPersonas`,
  insert: `${environment.urlBase}InsertPersonas`,
  delete: `${environment.urlBase}DeletePersonas`,
  update: `${environment.urlBase}UpdatePersonas`
};

export const students = {
  get: `${environment.urlBase}GetAlumnos`,
  insert: `${environment.urlBase}InsertAlumno`,
  delete: `${environment.urlBase}DeleteAlumno`,
  update: `${environment.urlBase}UpdateAlumno`
}

export const teachers = {
  get: `${environment.urlBase}GetProfesores`,
  insert: `${environment.urlBase}InsertProfesor`,
  delete: `${environment.urlBase}DeleteProfesor`,
  update: `${environment.urlBase}UpdateProfesor`
};

export const majors = {
  get: `${environment.urlBase}GetCarreras`,
  insert: `${environment.urlBase}InsertCarrera`,
  delete: `${environment.urlBase}DeleteCarrera`,
  update: `${environment.urlBase}UpdateCarrera`
};
export const subjects = {
  get: `${environment.urlBase}GetMaterias`,
  insert: `${environment.urlBase}InsertMateria`,
  delete: `${environment.urlBase}DeleteMateria`,
  update: `${environment.urlBase}UpdateMateria`
};
export const groups = {
  get: `${environment.urlBase}GetGrupos`,
  insert: `${environment.urlBase}InsertGrupo`,
  delete: `${environment.urlBase}DeleteGrupo`,
  update: `${environment.urlBase}UpdateGrupo`
};
export const groupsStudents = {
  get: `${environment.urlBase}GetGruposAlumnos`,
  insert: `${environment.urlBase}InsertGrupoAlumno`,
  delete: `${environment.urlBase}DeleteGruposAlumnos`,
  update: `${environment.urlBase}UpdateGrupoAlumno`
};
export const profiles = {
  get: `${environment.urlBase}GetPerfiles`
};

export const stores = {
  get: `${environment.urlBase}GetSucursales`
};