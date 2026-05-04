import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SharedModules } from '../../shared/shared-modules/shared-modules';
import { Api } from '../../services/api';

@Component({
  selector: 'app-students-form-page',
  imports: [...SharedModules],
  templateUrl: './students-form-page.html',
  styleUrl: './students-form-page.scss',
})
export class StudentsFormPage {
  studentForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private apiService: Api,
    private router: Router
  ) {
    this.studentForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      studentNo: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{12}$')],
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern('^[0-9]{10,11}$')]],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const formData = this.studentForm.value;

    const payload = {
      name: formData.name,
      student_no: formData.studentNo,
      email: formData.email,
      phone: formData.phone,
    };

    try {
      await this.apiService.httpPost('/students/add', payload);

      this.studentForm.reset();
      this.router.navigate(['/students']);
    } catch (error) {
      console.log('FAIL ==> ', error);
      this.errorMessage =
        'Failed to add student. Check API, token, and backend route.';
    } finally {
      this.isSubmitting = false;
    }
  }
}