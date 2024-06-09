import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReportService } from '../../../core/report.service';
import { ClassModel } from '../../../shared/models/class.model';
import { FlattenedActivity } from '../../../shared/models/activity.model';
import moment from 'moment';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-activity-report',
  templateUrl: './activity-report.component.html',
  styleUrl: './activity-report.component.scss'
})
export class ActivityReportComponent implements OnInit {
  classes!: ClassModel[];
  students!: string[];
  activities!: FlattenedActivity[];
  filterForm: FormGroup;
  tableData!: FlattenedActivity[];
  constructor(private report: ReportService) {
    this.filterForm = new FormGroup({
      selectedClass: new FormControl(''),
      selectedStudents: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
    });
  }

  ngOnInit() {
    this.getStudents();
    this.getActivities();

    this.filterForm.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(value => {
      if (value.selectedClass) {
        this.students = value.selectedClass.students;
      }
      const students = (value.selectedStudents?.length) ? value.selectedStudents : value.selectedClass.students;
      this.tableData = this.filterActivities(this.activities, students, value.startDate, value.endDate);
      console.log(this.tableData);

    });

  }

  async getStudents() {
    this.classes = await this.report.fetchClassData();
    this.students = Array.from(new Set(this.classes.flatMap(cls => cls.students)));
  }

  async getActivities() {
    this.activities = await this.report.fetchActivityData();
    this.tableData = this.activities;
  }

  onChangeClass(id: number) {
    const selectedClass = this.classes.find(c => c.id === id);
    if (selectedClass) {
      this.students = selectedClass.students;
      this.filterForm.controls['selectedStudents'].reset();
    }
  }

  filterActivities(activities: FlattenedActivity[], students?: string[], startDate?: Date, endDate?: Date): FlattenedActivity[] {

    return activities.filter(activity => {
      let includeActivity = true;

      if (students && students.length > 0) {
        includeActivity = includeActivity && students.includes(activity.student);
      }

      if (startDate) {
        includeActivity = includeActivity && (activity.week ? activity.week >= startDate : true);
      }

      if (endDate) {
        includeActivity = includeActivity && (activity.week ? activity.week <= endDate : true);
      }
      return includeActivity;
    });
  }

}


