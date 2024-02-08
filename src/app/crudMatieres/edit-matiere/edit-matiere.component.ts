import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BTHAService } from '../../service/btha.service';

@Component({
  selector: 'app-edit-matiere',
  templateUrl: './edit-matiere.component.html',
  styleUrl: './edit-matiere.component.css'
})
export class EditMatiereComponent {
  sectionId!: string;
  matiereId!: string;
  matiereDetails: any;
  sectionDetails: any;

  constructor(private route: ActivatedRoute, private router: Router, private service: BTHAService) { }

  ngOnInit() {
    this.service.isLoggedIn();
    this.route.params.subscribe((params) => {
      this.sectionId = params['sectionId'];
      this.matiereId = params['matiereId'];
      this.service.getMatiereDetails(this.sectionId, this.matiereId).subscribe(
        (details) => {
          this.matiereDetails = details;
        }
      );

      this.service.getSectionDetails(this.sectionId).subscribe(
        (details) => {
          this.sectionDetails = details;
        }
      );
    });
  }

  updateMatiere() {
    this.service.updateMatiere(this.sectionId, this.matiereId, this.matiereDetails).subscribe(
      () => {
        this.router.navigate(['/matieres']);
      }
    );
  }
}
