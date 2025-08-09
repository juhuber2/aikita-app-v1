import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Communication } from '../services/communication';
import { List } from '../models/list';

@Component({
  selector: 'app-page1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page1.html',
  styleUrl: './page1.css'
})
export class Page1 implements OnInit {
  lists: List[] = [];
  constructor(private communication: Communication) { }

  ngOnInit(): void {
    this.communication.getList().subscribe((lists) => {
      this.lists = lists;
      console.log(this.lists);
    });
  }
}