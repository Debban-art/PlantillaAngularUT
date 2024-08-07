import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { majors } from '@Global/endpoints';
import { MajorInserRequest, GetCarrerasResponse, MajorUpdateRequest } from '../models/majors';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders ({})
  }

  getMajors(): Observable<GetCarrerasResponse> {
    const httpOptions = {headers:this.headers}
    return this.http.get<GetCarrerasResponse>(majors.get, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  insertMajor(major:MajorInserRequest): Observable<boolean> {
    const httpOptions = {headers:this.headers}
    return this.http.post<boolean>(majors.insert, major, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  deleteMajor(id: number): Observable<Boolean> {
    const url = `${majors.delete}/${id}`; 
    const httpOptions = {headers: this.headers};
    return this.http.delete<Boolean>(url,httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  //Función para actualizar un registro
  updateMajors(major: MajorUpdateRequest): Observable<boolean> {
    const httpOptions = {headers:this.headers}
    return this.http.put<boolean>(majors.update, major, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }
}
