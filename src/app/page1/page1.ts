import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Communication } from '../services/communication';
import { List, SortingInterface } from '../models/list';

@Component({
  selector: 'app-page1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page1.html',
  styleUrl: './page1.css'
})
export class Page1 implements OnInit {
  lists: List[] = [];
  columns: Array<keyof List> = ['id', 'name', 'age'];
  sorting: SortingInterface = {
    column: 'id',
    order: 'asc'
  };

  constructor(private communication: Communication) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.communication.getList(this.sorting).subscribe((lists) => {
      this.lists = lists;
      console.log(this.lists);
    });
  }

  capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.substring(1);
  }

  isDescSorting(column: string): boolean {
    return this.sorting.column === column && this.sorting.order === 'desc';
  }

  isAscSorting(column: string): boolean {
    return this.sorting.column === column && this.sorting.order === 'asc';
  }

  sortTable(column: string): void {
    const futureSortingOrder = this.isDescSorting(column) ? 'asc' : 'desc';
    this.sorting = {
      column,   
      order: futureSortingOrder,
    };
    this.fetchData();
   }
  }