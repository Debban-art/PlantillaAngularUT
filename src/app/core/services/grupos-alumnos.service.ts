import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { groupsStudents } from 'src/app/global/endpoints';
import { GroupsStudentsInsertRequest,GruposAlumnosModel, GroupsStudentsUpdateRequest } from '../models/groupsStudents';
import { GetGruposAlumnosResponse } from '../models/groupsStudents';

@Injectable({
  providedIn: 'root'
})
export class GruposAlumnosService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders ({})
  }

  getGroupsStudents(): Observable<GetGruposAlumnosResponse> {
    const httpOptions = {headers:this.headers}
    return this.http.get<GetGruposAlumnosResponse>(groupsStudents.get, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  insertGroupStudent(groupStudent:GroupsStudentsInsertRequest): Observable<boolean> {
    const httpOptions = {headers:this.headers}
    return this.http.post<boolean>(groupsStudents.insert, groupStudent, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  deleteGroupStudent(id: number): Observable<Boolean> {
    const url = `${groupsStudents.delete}/${id}`;
    const httpOptions = {headers: this.headers};
    return this.http.delete<Boolean>(url,httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  updateGroupStudent(groupStudent: GroupsStudentsUpdateRequest): Observable<boolean> {
    const httpOptions = {headers:this.headers}
    return this.http.put<boolean>(groupsStudents.update, groupStudent, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }
}
