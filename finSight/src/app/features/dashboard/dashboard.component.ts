import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// Register the required components
echarts.use([TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer]);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('spendingTrendsChart') chartDom!: ElementRef;
  private chartInstance: echarts.ECharts | null = null;

  constructor() { }

  ngOnInit(): void {
    // Data can be fetched here
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  ngOnDestroy(): void {
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
  }

  private initChart(): void {
    if (this.chartDom) {
      this.chartInstance = echarts.init(this.chartDom.nativeElement);
      const option = {
        title: {
          text: 'Sample Spending Data (Last 6 Months)',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Spending',
            type: 'bar',
            barWidth: '60%',
            data: [1200, 1350, 1500, 1100, 1600, 1400] // Sample data
          }
        ]
      };
      this.chartInstance.setOption(option);

      // Optional: Resize chart with window resize
      // window.addEventListener('resize', () => {
      //   this.chartInstance?.resize();
      // });
    } else {
      console.error('Spending trends chart DOM element not found.');
    }
  }
}
