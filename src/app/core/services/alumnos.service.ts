import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { students } from 'src/app/global/endpoints';
import { StudentInsertRequest, GetStudentsResponse, StudentUpdateRequest } from '../models/students';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({})
  }

  getStudents(): Observable<GetStudentsResponse>{
    const httpOptions = {headers:this.headers}
    return this.http.get<GetStudentsResponse>(students.get, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  insertStudents(student:StudentInsertRequest): Observable<boolean> {
    const httpOptions = {headers:this.headers}
    return this.http.post<boolean>(students.insert, student, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  updateStudents(student: StudentUpdateRequest): Observable<boolean> {
    const httpOptions = {headers:this.headers}
    return this.http.put<boolean>(students.update, student, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  deleteStudents(id: number): Observable<Boolean> {
    const url = `${students.delete}/${id}`;
    const httpOptions = {headers: this.headers};
    return this.http.delete<Boolean>(url,httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

}