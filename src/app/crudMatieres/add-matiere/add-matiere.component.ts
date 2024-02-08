import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BTHAService } from '../../service/btha.service';

@Component({
  selector: 'app-add-matiere',
  templateUrl: './add-matiere.component.html',
  styleUrl: './add-matiere.component.css'
})
export class AddMatiereComponent {
  sections: any[] = [];
  sectionId: string = '';
  nomMatiere: string = '';

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
  
  addMatiere() {
    this.service.addMatiere(this.sectionId, this.nomMatiere).subscribe(
      () => {
        this.router.navigate(['/matieres']);
      }
    );
  }
}
