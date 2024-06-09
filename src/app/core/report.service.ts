import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {


  constructor(private apiService: ApiService) { }

  async fetchClassData() {
    const url = `/matific-test-classes`;
    const data = await firstValueFrom<any[]>(this.apiService.getRequest(url));
    console.log(data);
    return data;
  }

  async fetchActivityData() {
    const url = `/matific-test-activities`;
    const data = await firstValueFrom<any[]>(this.apiService.getRequest(url,true));
    console.log(data);
    return data;
  }
}
