import { Component } from '@angular/core';
import { BTHAService } from '../service/btha.service';

@Component({
  selector: 'app-matieres',
  templateUrl: './matieres.component.html',
  styleUrl: './matieres.component.css'
})
export class MatieresComponent {
  matieres: any[] = [];

  constructor(private service: BTHAService) { }

  refreshMatieres() {
    this.service.getMatieres().subscribe((res) => {
      this.matieres = res
    })
  }

  ngOnInit() {
    this.service.isLoggedIn();
    this.refreshMatieres();
  }

  deleteMatiere(sectionId: string, matiereId: string) {
    if (confirm('Etes-vous sûr de vouloir supprimer ce matiére?')) {
      this.service.deleteMatiere(sectionId, matiereId);
    }
  }
}
