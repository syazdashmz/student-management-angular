import { Component, OnInit } from '@angular/core';

import { SharedModules } from '../../shared/shared-modules/shared-modules';
import { Api } from '../../services/api';

@Component({
  selector: 'app-students-page',
  imports: [...SharedModules],
  templateUrl: './students-page.html',
  styleUrl: './students-page.scss',
})
export class StudentsPage implements OnInit {
  studentList: any[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private apiService: Api) {}

  ngOnInit(): void {
    this.getStudents();
  }

  async getStudents(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';

    try {
      const res: any = await this.apiService.httpGet('/students');

      this.studentList = res?.data || [];

      console.log('STUDENTS RESPONSE ==> ', res);
    } catch (error) {
      console.log('FAIL ==> ', error);

      this.errorMessage =
        'Failed to load students. Make sure Express API is running on http://localhost:3000';
    } finally {
      this.isLoading = false;
    }
  }
}