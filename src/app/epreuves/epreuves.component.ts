import { Component } from '@angular/core';
import { BTHAService } from '../service/btha.service';

@Component({
  selector: 'app-epreuves',
  templateUrl: './epreuves.component.html',
  styleUrl: './epreuves.component.css'
})
export class EpreuvesComponent {
  epreuves: any[] = [];

  constructor(private service: BTHAService) { }

  refreshEpreuves() {
    this.service.getEpreuves().subscribe((res) => {
      this.epreuves = res
    })
  }

  ngOnInit() {
    this.service.isLoggedIn();
    this.refreshEpreuves();
  }

  deleteEpreuve(sectionId: string, matiereId: string, epreuveId: string) {
    if (confirm('Etes-vous sûr de vouloir supprimer ce épreuve?')) {
      this.service.deleteEpreuve(sectionId, matiereId, epreuveId);
    }
  }
}
