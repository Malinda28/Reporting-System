import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Color, ScaleType, } from '@swimlane/ngx-charts';
import { FlattenedActivity } from '../../../../shared/models/activity.model';

@Component({
  selector: 'app-summary-bar-chart',
  templateUrl: './summary-bar-chart.component.html',
  styleUrl: './summary-bar-chart.component.scss'
})
export class SummaryBarChartComponent implements OnChanges {

  @Input() data!: FlattenedActivity[];
  @Input() filterFormValue!: any;

  selectedClass!: string;
  startDate!: string;
  endDate!: string;
  chartData!: any[];
  colorScheme: Color = {
    name: 'summary',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#FF3933', '#FF6100', '#FFCE00', '#6DCE01']
  };

  ngOnChanges(changes: SimpleChanges) {

    if (changes['filterFormValue']?.currentValue) {
      this.selectedClass = this.filterFormValue.selectedClass.name;
      this.startDate = this.filterFormValue.startDate;
      this.endDate = this.filterFormValue.endDate;
    }
    if (changes['data']?.currentValue) {
      const strengthLevels = {
        Excellent: 0,
        Good: 0,
        Ok: 0,
        Weak: 0
      };

      if (this.data?.length) {
        this.data.forEach(activity => {
          if (activity.value >= 90) {
            strengthLevels.Excellent++;
          } else if (activity.value >= 80) {
            strengthLevels.Good++;
          } else if (activity.value >= 60) {
            strengthLevels.Ok++;
          } else {
            strengthLevels.Weak++;
          }
        });
        const totalPercentage = 100 / this.data.length;
        this.chartData = [{
          name: '',
          series: [
            { name: 'Weak', value: Math.round(strengthLevels.Weak * totalPercentage), styleClass: 'bg-weak' },
            { name: 'Ok', value: Math.round(strengthLevels.Ok * totalPercentage), styleClass: 'bg-ok' },
            { name: 'Good', value: Math.round(strengthLevels.Good * totalPercentage), styleClass: 'bg-good' },
            { name: 'Excellent', value: Math.round(strengthLevels.Excellent * totalPercentage), styleClass: 'bg-excellent' }
          ]
        }];
        console.log(strengthLevels);
      }
    }

  }
}
