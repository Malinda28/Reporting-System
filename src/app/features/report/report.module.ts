import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportRoutingModule } from './report-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ActivityReportComponent } from './activity-report/activity-report.component';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { SummaryBarChartComponent } from './activity-report/summary-bar-chart/summary-bar-chart.component';
@NgModule({
  declarations: [
    ActivityReportComponent,
    SummaryBarChartComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    SharedModule,
    DropdownModule,
    MultiSelectModule,
    CalendarModule,
  ],
})
export class ReportModule { }
