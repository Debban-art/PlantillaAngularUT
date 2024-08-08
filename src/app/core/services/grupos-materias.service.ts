import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { groupsSubjects } from '@Global/endpoints';
import { GroupsSubjectsInsertRequest, GruposMateriasModel, GroupsSubjectsUpdateRequest } from '../models/groups-subjects';
import { GetGruposMateriasResponse } from '../models/groups-subjects';

@Injectable({
  providedIn: 'root'
})
export class GruposMateriasService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders ({})
  }

  getGroupsSubjects(): Observable<GetGruposMateriasResponse> {
    const httpOptions = {headers:this.headers}
    return this.http.get<GetGruposMateriasResponse>(groupsSubjects.get, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  insertGroupSubject(groupSubject:GroupsSubjectsInsertRequest): Observable<boolean> {
    const httpOptions = {headers:this.headers}
    return this.http.post<boolean>(groupsSubjects.insert, groupSubject, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  deleteGroupSubject(id: number): Observable<Boolean> {
    const url = `${groupsSubjects.delete}/${id}`;
    const httpOptions = {headers: this.headers};
    return this.http.delete<Boolean>(url,httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  updateGroupSubject(groupSubject: GroupsSubjectsUpdateRequest): Observable<boolean> {
    const httpOptions = {headers:this.headers}
    return this.http.put<boolean>(groupsSubjects.update, groupSubject, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }
}
