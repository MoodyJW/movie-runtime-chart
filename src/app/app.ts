import { Component, signal, OnInit, inject } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MovieData, YearlyAverage } from './services/movie-data';

@Component({
  selector: 'app-root',
  imports: [NgxChartsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private movieDataService = inject(MovieData);
  protected readonly title = signal('Movie Runtime Chart');
  protected readonly chartData = signal<YearlyAverage[]>([]);

  ngOnInit() {
    this.loadChartData();
  }

  private loadChartData() {
    this.movieDataService.getAverageRuntimeByYear().subscribe(data => {
      this.chartData.set(data);
    });
  }
}
