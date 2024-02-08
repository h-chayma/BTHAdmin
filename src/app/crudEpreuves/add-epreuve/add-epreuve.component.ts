import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BTHAService } from '../../service/btha.service';

@Component({
  selector: 'app-add-epreuve',
  templateUrl: './add-epreuve.component.html',
  styleUrl: './add-epreuve.component.css'
})
export class AddEpreuveComponent {
  sections: any[] = [];
  matieres: any[] = [];
  selectedSection: string = '';
  selectedMatiere: string = '';
  sectionSelected: boolean = false;
  anneeEpreuve: string = '';
  enoncePr: string = '';
  corrigePr: string = '';
  enonceCon: string = '';
  corrigeCon: string = '';

  constructor(private service: BTHAService, private router: Router) { }

  ngOnInit() {
    this.service.isLoggedIn();
    this.refreshSections();
  }

  refreshSections() {
    this.service.getSections().subscribe((res) => {
      this.sections = res
    })
  }

  onSectionChange() {
    this.sectionSelected = !!this.selectedSection;
    if (this.selectedSection) {
      this.service.getMatieresBySectionId(this.selectedSection).subscribe((matieres) => {
        this.matieres = matieres;
      });
    } else {
      this.matieres = [];
    }
  }

  addEpreuve() {
    this.service.addEpreuve(this.selectedSection, this.selectedMatiere, this.anneeEpreuve, this.enoncePr, this.corrigePr, this.enonceCon, this.corrigeCon).subscribe(
      () => {
        this.router.navigate(['/epreuves']);
      }
    );
  }
}
