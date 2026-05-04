import { Component, OnInit } from '@angular/core';

import { SharedModules } from '../../shared/shared-modules/shared-modules';
import { Api } from '../../services/api';

@Component({
  selector: 'app-api-get',
  imports: [...SharedModules],
  templateUrl: './api-get.html',
  styleUrl: './api-get.scss',
})
export class ApiGet implements OnInit {
  productsList: any[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private apiService: Api) {}

  ngOnInit(): void {
    this.getProducts();
  }

  async getProducts(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';

    try {
      const res: any = await this.apiService.httpGet(
        'https://dummyjson.com/products?limit=10'
      );

      this.productsList = res?.products || [];
    } catch (error) {
      console.log('FAIL ==> ', error);
      this.errorMessage = 'Failed to load products from API.';
    } finally {
      this.isLoading = false;
    }
  }
}