import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { teachers } from '@Global/endpoints';
import { TeacherInsertRequest, GetProfesoresResponse, TeacherUpdateRequest } from '../models/teachers';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({})
  }

  getTeachers(): Observable<GetProfesoresResponse> {
    const httpOptions = {headers:this.headers}
    return this.http.get<GetProfesoresResponse>(teachers.get, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  insertTeacher(teacher:TeacherInsertRequest): Observable<boolean> {
    const httpOptions = {headers:this.headers}
    return this.http.post<boolean>(teachers.insert, teacher, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  deleteTeacher(id: number): Observable<Boolean> {
    const url = `${teachers.delete}/${id}`; 
    const httpOptions = {headers: this.headers};
    return this.http.delete<Boolean>(url,httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  updateTeacher(teacher: TeacherUpdateRequest): Observable<boolean> {
    const httpOptions = {headers:this.headers}
    return this.http.put<boolean>(teachers.update, teacher, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }
}
