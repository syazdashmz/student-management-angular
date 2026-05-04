import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { SharedModules } from '../../shared/shared-modules/shared-modules';
import { Data } from '../../services/data';
import { DialogAdd } from '../../components/dialog-add/dialog-add';

interface TodoItem {
  title: string;
  selected: boolean;
  createdAt: string;
}

@Component({
  selector: 'app-to-do',
  imports: [...SharedModules],
  templateUrl: './to-do.html',
  styleUrl: './to-do.scss',
})
export class ToDo implements OnInit {
  todoList: TodoItem[] = [];

  constructor(
    private dataService: Data,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadTodoList();
  }

  get completedCount(): number {
    return this.todoList.filter((todo) => todo.selected).length;
  }

  onAdd(): void {
    const dialogRef = this.dialog.open(DialogAdd, {
      width: '420px',
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (!result) return;

      this.todoList.push({
        title: result,
        selected: false,
        createdAt: new Date().toISOString(),
      });

      this.saveTodoList();
    });
  }

  onSelected(index: number): void {
    this.todoList[index].selected = !this.todoList[index].selected;
    this.saveTodoList();
  }

  onDelete(index: number): void {
    this.todoList.splice(index, 1);
    this.saveTodoList();
  }

  onClearCompleted(): void {
    this.todoList = this.todoList.filter((todo) => !todo.selected);
    this.saveTodoList();
  }

  private loadTodoList(): void {
    const saved = this.dataService.getLocalStorage<TodoItem[]>('todoList');
    this.todoList = saved || [];
  }

  private saveTodoList(): void {
    this.dataService.setLocalStorage('todoList', this.todoList);
  }
}