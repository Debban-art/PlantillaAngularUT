import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  getPersons(): Observable<GetPersonasResponse> {
    const httpOptions = {headers:this.headers}
    return this.http.get<GetPersonasResponse>(persons.get, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  insertPersons(person:PersonInsertRequest): Observable<boolean> {
    const httpOptions = {headers:this.headers}
    return this.http.post<boolean>(persons.insert, person, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  deletePersons(id: number): Observable<Boolean> {
    const url = `${persons.delete}/${id}`;
    const httpOptions = {
      headers: this.headers
    };
    return this.http.delete<Boolean>(url,httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

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