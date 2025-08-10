import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Communication } from '../services/communication';
import { List, SortingInterface } from '../models/list';


@Component({
  selector: 'app-page1',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './page1.html',
  styleUrl: './page1.css'
})
export class Page1 implements OnInit {
  lists: List[] = [];
  columns: Array<keyof List> = ['id', 'name', 'username', 'email'];
  sorting: SortingInterface = {
    column: 'id',
    order: 'asc'
  };

  // Reactive form for search functionality
  searchForm;

  constructor(private communication: Communication, private fb: FormBuilder) { 
    this.searchForm = this.fb.nonNullable.group({
      searchValue: ''
    });
  }

  searchValue: string = '';

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.communication.getList(this.sorting, this.searchValue).subscribe((lists) => {
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

   onSearchSubmit(): void {
    console.log('searchValue:', this.searchForm.value.searchValue);
    this.searchValue = (this.searchForm.value.searchValue ?? '').trim().toLowerCase();
    this.fetchData();
    /* ? Optional Chaining: Verhindert, dass eine Methode aufgerufen wird, wenn der Wert null oder undefined ist. */
    /* ?? Nullish Coalescing: Falls der Wert null oder undefined ist, nimm stattdessen diesen Wert. */
   }
  }