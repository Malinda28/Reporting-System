import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { firstValueFrom } from 'rxjs';
import { Activity, FlattenedActivity } from '../shared/models/activity.model';
import moment from 'moment';
import { ClassModel } from '../shared/models/class.model';
@Injectable({
  providedIn: 'root'
})
export class ReportService {


  constructor(private apiService: ApiService) { }

  async fetchClassData() {
    const url = `/matific-test-classes`;
    const data = await firstValueFrom<ClassModel[]>(this.apiService.getRequest(url));
    data.forEach(c => {
      c.students.sort();
    });
    return data;
  }

  async fetchActivityData() {
    const url = `/matific-test-activities`;
    const data = await firstValueFrom<Activity[]>(this.apiService.getRequest(url, true));
    const flattenedData: FlattenedActivity[] = [];
    data.forEach(item => {
      const { id, content, student, skill, type, time: duration, attempts } = item;
      const { weeks, values } = attempts;
      weeks.forEach((week, index) => {
        flattenedData.push({
          id,
          content,
          student,
          skill,
          type,
          duration,
          week: moment(week, "DD/MM/YY").toDate(),
          value: values[index]
        });
      });
    });
    return flattenedData;
  }
}
