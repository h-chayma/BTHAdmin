import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BTHAService } from '../../service/btha.service';

@Component({
  selector: 'app-edit-section',
  templateUrl: './edit-section.component.html',
  styleUrl: './edit-section.component.css'
})
export class EditSectionComponent {
  sectionId!: string;
  sectionDetails: any = { nom: '', icon: '' };

  constructor(private route: ActivatedRoute, private router: Router, private service: BTHAService) { }

  ngOnInit() {
    this.service.isLoggedIn();
    this.route.params.subscribe((params) => {
      this.sectionId = params['id'];
      this.service.getSectionDetails(this.sectionId).subscribe(
        (details) => {
          console.log("Received section details: ", details);
          this.sectionDetails.nom = details.nom;
          this.sectionDetails.icon = details.icon;
        }
      );
    });
  }

  updateSection() {
    this.service.updateSection(this.sectionId, this.sectionDetails).subscribe(
      () => {
        this.router.navigate(['/sections']);
      }
    );
  }
}
