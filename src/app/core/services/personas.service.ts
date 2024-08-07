import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { persons } from 'src/app/global/endpoints';
import { PersonInsertRequest, GetPersonasResponse, PersonUpdateRequest } from '@Models/Person'

@Injectable({
  providedIn: 'root',
})
export class PersonasService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders ({})
  }

  // Función para obtener los registros de personas (solo aquellos que tienen el estatus de activo)
  getPersons(): Observable<GetPersonasResponse> {
    const httpOptions = {headers:this.headers}
    return this.http.get<GetPersonasResponse>(persons.get, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  //Función para insertar una nueva persona.
  insertPersons(person:PersonInsertRequest): Observable<boolean> {
    const httpOptions = {headers:this.headers}
    return this.http.post<boolean>(persons.insert, person, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  // Función para eliminar un registro (en este caso marcar como inactivo)
  deletePersons(id: number): Observable<Boolean> {
    const url = `${persons.delete}/${id}`; // Se le tiene que agregar el id que se desea eliminar en el url (Se cambio en el controller de la API, el metodo delete no acepta parametros aparte de la url)
    const httpOptions = {headers: this.headers};
    return this.http.delete<Boolean>(url,httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  //Función para actualizar un registro
  updatePersons(person: PersonUpdateRequest): Observable<boolean> {
    const httpOptions = {headers:this.headers}
    return this.http.put<boolean>(persons.update, person, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }
}