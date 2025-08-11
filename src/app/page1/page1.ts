import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Communication } from '../services/communication';
import { List, SortingInterface } from '../models/list';
import * as XLSX from 'xlsx';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Fonts registrieren
(pdfMake as any).vfs = (pdfFonts as any).vfs;


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

  // Export to Excel functionality
    fileName = 'ExportExce.xlsx';
    exportexcel(): void {
        /* pass here the table id */
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.lists);
        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        /* save to file */
        XLSX.writeFile(wb, this.fileName);
    }

    // Exort to PDF functionality
    generatePDF(): void { 
      const docDefinition = {
        content: [
          {
            text: 'Exported Data',
            style: 'header'
          },
          {
            table: {
              body: [
                this.columns.map(col => this.capitalize(col.toString())),
                ...this.lists.map(item => this.columns.map(col => item[col]))
              ]
            }
          }
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10]  as [number, number, number, number]
          }
        }
      };

      pdfMake.createPdf(docDefinition).download('exported_data.pdf');
    } 


  }