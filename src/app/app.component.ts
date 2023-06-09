import { Component } from '@angular/core';
import { LoadingService } from './Services/Loading/LoadingService';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private http: HttpClient, private loadingService: LoadingService) {}

  get isLoading(): boolean {
    return this.loadingService.isLoading;
  }

   
}
