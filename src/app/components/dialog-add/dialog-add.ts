import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { SharedModules } from '../../shared/shared-modules/shared-modules';

@Component({
  selector: 'app-dialog-add',
  imports: [...SharedModules],
  templateUrl: './dialog-add.html',
  styleUrl: './dialog-add.scss',
})
export class DialogAdd {
  todoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogAdd>
  ) {
    this.todoForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    if (this.todoForm.invalid) {
      this.todoForm.markAllAsTouched();
      return;
    }

    const title = this.todoForm.value.title?.trim();

    if (title) {
      this.dialogRef.close(title);
    }
  }
}