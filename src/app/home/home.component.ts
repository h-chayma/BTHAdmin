import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BTHAService } from '../service/btha.service';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  sectionCount: Observable<number> | undefined;
  matiereCount: Observable<number> | undefined;
  epreuveCount: Observable<number> | undefined;

  constructor(private service: BTHAService) { }

  ngOnInit() {
    this.service.isLoggedIn();
    this.service.getEpreuvesWithYear().subscribe(epreuves => {
      const epreuvesByYear = this.groupEpreuvesByYear(epreuves);
      this.epreuvesByYearLabels = Object.keys(epreuvesByYear);
      this.epreuvesByYearData = [{ data: Object.values(epreuvesByYear), label: 'Epreuves' }];
    });

    this.sectionCount = this.service.getSectionCount();
    this.matiereCount = this.service.getMatiereCount();
    this.epreuveCount = this.service.getEpreuveCount();
  }

  epreuvesByYearData: ChartDataset[] = [];
  epreuvesByYearLabels: string[] = [];
  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true
      }
    }
  };
  chartType: ChartType = 'bar';

  groupEpreuvesByYear(epreuves: any[]): { [year: string]: number } {
    const epreuvesByYear: { [year: string]: number } = {};
    epreuves.forEach(epreuve => {
      if (epreuve.year) {
        if (epreuvesByYear[epreuve.year]) {
          epreuvesByYear[epreuve.year]++;
        } else {
          epreuvesByYear[epreuve.year] = 1;
        }
      }
    });
    return epreuvesByYear;
  }
}