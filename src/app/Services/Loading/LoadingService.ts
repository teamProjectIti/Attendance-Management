import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {
  isLoading = false;

  showLoading() {
    this.isLoading = true;
  }

  hideLoading() {
    this.isLoading = false;
  }
}
