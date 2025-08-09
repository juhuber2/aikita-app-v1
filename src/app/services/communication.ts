import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { List, SortingInterface } from '../models/list';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Communication {
  
  constructor(private httpClient: HttpClient) {}

  getList(sorting: SortingInterface): Observable<List[]> {
    const url = `https://raw.githubusercontent.com/juhuber2/my-json-data/refs/heads/main/listsTest.json?_sort=${sorting.column}&_order=${sorting.order}`;
    return this.httpClient.get<List[]>(url);
  }
}