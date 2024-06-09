import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReportService } from '../../../core/report.service';
import { ClassModel } from '../../../shared/models/class.model';

@Component({
  selector: 'app-activity-report',
  templateUrl: './activity-report.component.html',
  styleUrl: './activity-report.component.scss'
})
export class ActivityReportComponent implements OnInit {
  classes!: ClassModel[];
  students!: string[];
  filterForm: FormGroup;
  constructor(private report: ReportService) {
    this.filterForm = new FormGroup({
      selectedClass: new FormControl(''),
      selectedStudents: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      // selectedStudents: new FormControl(''),
    });
  }

  ngOnInit() {
    this.getStudents();
    this.getActivities();
  }

  async getStudents() {
    this.classes = await this.report.fetchClassData();
  }

  async getActivities() {
    await this.report.fetchActivityData();
  }
  onChangeClass(id: number) {
    const selectedClass = this.classes.find(c => c.id===id);
    if (selectedClass) {
      this.students = selectedClass.students;
    }
  }
}


