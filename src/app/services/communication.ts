import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { List, SortingInterface } from '../models/list';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Communication {
  
  constructor(private httpClient: HttpClient) {}

  getList(sorting: SortingInterface, searchValue: string): Observable<List[]> {
    const url = `https://jsonplaceholder.typicode.com/users?_sort=${sorting.column}&_order=${sorting.order}&name_like=${searchValue}`;
    return this.httpClient.get<List[]>(url);
  }
}