import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { groups } from 'src/app/global/endpoints';
import { GetGruposResponse, GroupInsertRequest, GroupUpdateRequest, GrupoModel } from '../models/groups';
@Injectable({
  providedIn: 'root'
})
export class GruposService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders ({})
  }

  getGroups(): Observable<GetGruposResponse> {
    const httpOptions = {headers:this.headers}
    return this.http.get<GetGruposResponse>(groups.get, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  insertGroup(group:GroupInsertRequest): Observable<boolean> {
    const httpOptions = {headers:this.headers}
    return this.http.post<boolean>(groups.insert, group, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  deleteGroup(id: number): Observable<Boolean> {
    const url = `${groups.delete}/${id}`;
    const httpOptions = {headers: this.headers};
    return this.http.delete<Boolean>(url,httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  updateGroup(group: GroupUpdateRequest): Observable<boolean> {
    const httpOptions = {headers:this.headers}
    return this.http.put<boolean>(groups.update, group, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }
}
