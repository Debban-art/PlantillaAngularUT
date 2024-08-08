import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { grades } from '@Global/endpoints';
import { GradeInsertRequest, CalificacionModel, GradeUpdateRequest } from '../models/grades';
import { GetCalificacionesResponse } from '../models/grades';
@Injectable({
  providedIn: 'root'
})
export class CalificacionesService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders ({})
  }

  getGrades(): Observable<GetCalificacionesResponse> {
    const httpOptions = {headers:this.headers}
    return this.http.get<GetCalificacionesResponse>(grades.get, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  insertGrade(grade:GradeInsertRequest): Observable<boolean> {
    const httpOptions = {headers:this.headers}
    return this.http.post<boolean>(grades.insert, grade, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  deleteGrade(id: number): Observable<Boolean> {
    const url = `${grades.delete}/${id}`;
    const httpOptions = {headers: this.headers};
    return this.http.delete<Boolean>(url,httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  updateGrade(grade: GradeUpdateRequest): Observable<boolean> {
    const httpOptions = {headers:this.headers}
    return this.http.put<boolean>(grades.update, grade, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }
}
