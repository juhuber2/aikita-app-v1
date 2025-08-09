import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from '../models/list';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Communication {
  private url = 'https://raw.githubusercontent.com/juhuber2/my-json-data/refs/heads/main/listsTest.json';

  constructor(private httpClient: HttpClient) {}

  getList(): Observable<List[]> {
    return this.httpClient.get<List[]>(this.url);
  }
}