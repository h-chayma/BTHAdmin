import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BTHAService } from '../../service/btha.service';

@Component({
  selector: 'app-edit-epreuve',
  templateUrl: './edit-epreuve.component.html',
  styleUrl: './edit-epreuve.component.css'
})
export class EditEpreuveComponent {
  sections: any[] = [];
  matieres: any[] = [];
  sectionId!: string;
  matiereId!: string;
  epreuveId!: string;

  matiereDetails: any;
  epreuveDetails: any;
  sectionDetails: any;

  constructor(private route: ActivatedRoute, private router: Router, private service: BTHAService) { }

  ngOnInit() {
    this.service.isLoggedIn();
    this.route.params.subscribe((params) => {
      this.sectionId = params['sectionId'];
      this.matiereId = params['matiereId'];
      this.epreuveId = params['epreuveId'];

      this.service.getEpreuveDetails(this.sectionId, this.matiereId, this.epreuveId).subscribe(
        (details) => {
          this.epreuveDetails = details;
          console.log("resultat : ", this.epreuveDetails);
        }
      );

      this.service.getSectionDetails(this.sectionId).subscribe(
        (details) => {
          this.sectionDetails = details;
        }
      );

      this.service.getMatiereDetails(this.sectionId, this.matiereId).subscribe(
        (details) => {
          this.matiereDetails = details;
        }
      );
    });
  }

  updateEpreuve() {
    this.service.updateEpreuve(this.sectionId, this.matiereId, this.epreuveId, this.epreuveDetails).subscribe(
      () => {
        this.router.navigate(['/matieres']);
      }
    );
  }

}
