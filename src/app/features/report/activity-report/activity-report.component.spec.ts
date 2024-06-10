import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivityReportComponent } from './activity-report.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReportService } from '../../../core/report.service';
import { FlattenedActivity } from '../../../shared/models/activity.model';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import moment from 'moment';

describe('ActivityReportComponent', () => {
  let component: ActivityReportComponent;
  let fixture: ComponentFixture<ActivityReportComponent>;
  let reportServiceSpy: jasmine.SpyObj<ReportService>;

  beforeEach(async () => {
    const reportServiceSpyObj = jasmine.createSpyObj('ReportService', ['fetchClassData', 'fetchActivityData']);

    await TestBed.configureTestingModule({
      declarations: [ActivityReportComponent],
      imports: [ReactiveFormsModule,
        DropdownModule,
        MultiSelectModule,
        CalendarModule,
        TableModule,
        NgxChartsModule],
      providers: [{
        provide: ReportService, useValue: reportServiceSpyObj
      }]
    }).compileComponents();

    reportServiceSpy = TestBed.inject(ReportService) as jasmine.SpyObj<ReportService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('to check if the filtered data contains two activities', () => {
    const activities: FlattenedActivity[] = [
      { id: 1, content: 'Activity 1', student: 'Student 1', skill: 'Skill 1', type: 'Type 1', duration: '1 hour', week: moment('15-05-2024', "DD/MM/YY").toDate(), value: 10 },
      { id: 2, content: 'Activity 2', student: 'Student 2', skill: 'Skill 2', type: 'Type 2', duration: '2 hours', week: moment('15-05-2024', "DD/MM/YY").toDate(), value: 20 },
      { id: 3, content: 'Activity 3', student: 'Student 3', skill: 'Skill 3', type: 'Type 3', duration: '3 hours', week: moment('15-05-2024', "DD/MM/YY").toDate(), value: 30 }
    ];

    component.activities = activities;
    component.tableData = [];
    component.classes = [{ id: 2, name: 'Class 2', students: ['Student 1', 'Student 2'] }];

    const data = component.filterActivities(
      ['Student 1', 'Student 2'],
      moment('14-05-2024', "DD/MM/YY").toDate(),
      moment('17-06-2024', "DD/MM/YY").toDate()
    );

    expect(data.length).toBe(2);
    expect(data[0].student).toBe('Student 1');
  });


  it('to check if the filtered data contains no activities', () => {
    const activities: FlattenedActivity[] = [
      { id: 1, content: 'Activity 1', student: 'Student 1', skill: 'Skill 1', type: 'Type 1', duration: '1 hour', week: moment('15-05-2024', "DD/MM/YY").toDate(), value: 10 },
      { id: 2, content: 'Activity 2', student: 'Student 2', skill: 'Skill 2', type: 'Type 2', duration: '2 hours', week: moment('15-05-2024', "DD/MM/YY").toDate(), value: 20 },
      { id: 3, content: 'Activity 3', student: 'Student 3', skill: 'Skill 3', type: 'Type 3', duration: '3 hours', week: moment('15-05-2024', "DD/MM/YY").toDate(), value: 30 }
    ];

    component.activities = activities;
    component.tableData = [];
    component.classes = [{ id: 3, name: 'Class 3', students: ['Student 5', 'Student 4'] }];

    const data = component.filterActivities(
      ['Student 5'],
      moment('14-05-2024', "DD/MM/YY").toDate(),
      moment('17-06-2024', "DD/MM/YY").toDate()
    );

    expect(data.length).toBe(0);
  });
});
