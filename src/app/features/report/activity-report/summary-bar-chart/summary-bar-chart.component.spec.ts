import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryBarChartComponent } from './summary-bar-chart.component';

describe('SummaryBarChartComponent', () => {
  let component: SummaryBarChartComponent;
  let fixture: ComponentFixture<SummaryBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryBarChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
