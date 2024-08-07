import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { subjects } from 'src/app/global/endpoints';
import { SubjectInsertRequest, GetMateriasResponse, SubjectUpdateRequest } from '../models/subjects';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders ({})
  }

  getSubjects(): Observable<GetMateriasResponse> {
    const httpOptions = {headers:this.headers}
    return this.http.get<GetMateriasResponse>(subjects.get, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  insertSubject(subject:SubjectInsertRequest): Observable<boolean> {
    const httpOptions = {headers:this.headers}
    return this.http.post<boolean>(subjects.insert, subject, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  deleteSubject(id: number): Observable<Boolean> {
    const url = `${subjects.delete}/${id}`;
    const httpOptions = {headers: this.headers};
    return this.http.delete<Boolean>(url,httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  updatePersons(subject: SubjectUpdateRequest): Observable<boolean> {
    const httpOptions = {headers:this.headers}
    return this.http.put<boolean>(subjects.update, subject, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }
}
