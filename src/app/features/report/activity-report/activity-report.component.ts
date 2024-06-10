import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReportService } from '../../../core/report.service';
import { ClassModel } from '../../../shared/models/class.model';
import { FlattenedActivity } from '../../../shared/models/activity.model';
import { Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'app-activity-report',
  templateUrl: './activity-report.component.html',
  styleUrl: './activity-report.component.scss'
})
export class ActivityReportComponent implements OnInit, OnDestroy {
  classes: ClassModel[] = [];
  students!: string[];
  activities!: FlattenedActivity[];
  filterForm: FormGroup;
  tableData!: FlattenedActivity[];
  minStartDate!: Date;
  sub!: Subscription;

  constructor(private report: ReportService) {
    this.filterForm = new FormGroup({
      selectedClass: new FormControl(''),
      selectedStudents: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
    });
  }

  get filterFormValue() {
    return this.filterForm.value;
  }

  get startDate() {
    return this.filterForm.value.startDate;
  }
  get endDate() {
    return this.filterForm.value.endDate;
  }

  get listingStudents() {
    console.log(this.filterForm.value.selectedStudents, this.filterFormValue.selectedClass.students);

    return this.filterForm.value.selectedStudents ? this.filterForm.value.selectedStudents : this.filterFormValue.selectedClass.students;
  }

  ngOnInit() {
    this.getStudents();
    this.getActivities();

    this.sub = this.filterForm.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(value => {
      if (value.selectedClass) {
        this.students = value.selectedClass.students;
      }
      const students = (value.selectedStudents?.length) ? value.selectedStudents : value.selectedClass.students;
      this.tableData = this.filterActivities(students, value.startDate, value.endDate);
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

  onClearStudents() {
    this.filterForm.controls['selectedStudents'].reset();
  }

  filterActivities(students?: string[], startDate?: Date, endDate?: Date): FlattenedActivity[] {

    return this.activities.filter(activity => {
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

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

